import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const contactService = {
  // Get all contacts
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('contacts_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response.success) {
        console.error("Error fetching contacts:", response.message);
        toast.error(response.message);
        return [];
      }

      // Handle empty or non-existent data
      if (!response?.data?.length) {
        return [];
      }

      // Map database fields to UI field names
      return response.data.map(contact => ({
        Id: contact.Id,
        name: contact.name_c || contact.Name || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        category: contact.category_c?.Name || "",
        notes: contact.notes_c || "",
        isFavorite: contact.isFavorite_c || false,
        createdAt: contact.CreatedOn || new Date().toISOString(),
        updatedAt: contact.ModifiedOn || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      return [];
    }
  },

  // Get contact by ID
  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('contacts_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response?.data) {
        return null;
      }

      const contact = response.data;
      return {
        Id: contact.Id,
        name: contact.name_c || contact.Name || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        category: contact.category_c?.Name || "",
        notes: contact.notes_c || "",
        isFavorite: contact.isFavorite_c || false,
        createdAt: contact.CreatedOn || new Date().toISOString(),
        updatedAt: contact.ModifiedOn || new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  // Create new contact
  create: async (contactData) => {
    try {
      const apperClient = getApperClient();

      // Get category ID if category name is provided
      let categoryId = null;
      if (contactData.category) {
        const categoryResponse = await apperClient.fetchRecords('categories_c', {
          fields: [{"field": {"Name": "Id"}}, {"field": {"Name": "name_c"}}],
          where: [{
            "FieldName": "name_c",
            "Operator": "EqualTo",
            "Values": [contactData.category]
          }]
        });

        if (categoryResponse.success && categoryResponse.data.length > 0) {
          categoryId = categoryResponse.data[0].Id;
        }
      }

      const params = {
        records: [{
          Name: contactData.name,
          name_c: contactData.name,
          phone_c: contactData.phone || "",
          email_c: contactData.email || "",
          company_c: contactData.company || "",
          category_c: categoryId,
          notes_c: contactData.notes || "",
          isFavorite_c: contactData.isFavorite || false
        }]
      };

      const response = await apperClient.createRecord('contacts_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} contacts:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          const newContact = successful[0].data;
          return {
            Id: newContact.Id,
            name: newContact.name_c || newContact.Name || "",
            phone: newContact.phone_c || "",
            email: newContact.email_c || "",
            company: newContact.company_c || "",
            category: contactData.category, // Keep original category name for UI
            notes: newContact.notes_c || "",
            isFavorite: newContact.isFavorite_c || false,
            createdAt: newContact.CreatedOn || new Date().toISOString(),
            updatedAt: newContact.ModifiedOn || new Date().toISOString()
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      return null;
    }
  },

  // Update existing contact
  update: async (id, contactData) => {
    try {
      const apperClient = getApperClient();

      // Get category ID if category name is provided
      let categoryId = null;
      if (contactData.category) {
        const categoryResponse = await apperClient.fetchRecords('categories_c', {
          fields: [{"field": {"Name": "Id"}}, {"field": {"Name": "name_c"}}],
          where: [{
            "FieldName": "name_c",
            "Operator": "EqualTo",
            "Values": [contactData.category]
          }]
        });

        if (categoryResponse.success && categoryResponse.data.length > 0) {
          categoryId = categoryResponse.data[0].Id;
        }
      }

      const params = {
        records: [{
          Id: parseInt(id),
          Name: contactData.name,
          name_c: contactData.name,
          phone_c: contactData.phone || "",
          email_c: contactData.email || "",
          company_c: contactData.company || "",
          category_c: categoryId,
          notes_c: contactData.notes || "",
          isFavorite_c: contactData.isFavorite || false
        }]
      };

      const response = await apperClient.updateRecord('contacts_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Contact not found");
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} contacts:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          const updatedContact = successful[0].data;
          return {
            Id: updatedContact.Id,
            name: updatedContact.name_c || updatedContact.Name || "",
            phone: updatedContact.phone_c || "",
            email: updatedContact.email_c || "",
            company: updatedContact.company_c || "",
            category: contactData.category, // Keep original category name for UI
            notes: updatedContact.notes_c || "",
            isFavorite: updatedContact.isFavorite_c || false,
            createdAt: updatedContact.CreatedOn || new Date().toISOString(),
            updatedAt: updatedContact.ModifiedOn || new Date().toISOString()
          };
        }
      }
      throw new Error("Contact not found");
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
      throw new Error("Contact not found");
    }
  },

  // Delete contact
  delete: async (id) => {
    try {
      const apperClient = getApperClient();
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('contacts_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Contact not found");
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} contacts:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      throw new Error("Contact not found");
    }
  },

  // Search contacts
  search: async (query) => {
    try {
      if (!query || query.trim() === "") {
        return await contactService.getAll();
      }

      const apperClient = getApperClient();
      const searchTerm = query.toLowerCase();

      const response = await apperClient.fetchRecords('contacts_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [
              {"fieldName": "name_c", "operator": "Contains", "values": [searchTerm]}
            ]},
            {"conditions": [
              {"fieldName": "email_c", "operator": "Contains", "values": [searchTerm]}
            ]},
            {"conditions": [
              {"fieldName": "company_c", "operator": "Contains", "values": [searchTerm]}
            ]},
            {"conditions": [
              {"fieldName": "phone_c", "operator": "Contains", "values": [searchTerm]}
            ]}
          ]
        }]
      });

      if (!response.success) {
        console.error("Error searching contacts:", response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(contact => ({
        Id: contact.Id,
        name: contact.name_c || contact.Name || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        category: contact.category_c?.Name || "",
        notes: contact.notes_c || "",
        isFavorite: contact.isFavorite_c || false,
        createdAt: contact.CreatedOn || new Date().toISOString(),
        updatedAt: contact.ModifiedOn || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error searching contacts:", error?.response?.data?.message || error);
      return [];
    }
  },

  // Get contacts by category
  getByCategory: async (category) => {
    try {
      if (!category || category === "all") {
        return await contactService.getAll();
      }

      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('contacts_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "isFavorite_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        whereGroups: [{
          "operator": "AND",
          "subGroups": [
            {"conditions": [
              {"fieldName": "category_c", "operator": "ExactMatch", "values": [category]}
            ]}
          ]
        }]
      });

      if (!response.success) {
        console.error("Error fetching contacts by category:", response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(contact => ({
        Id: contact.Id,
        name: contact.name_c || contact.Name || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        category: contact.category_c?.Name || "",
        notes: contact.notes_c || "",
        isFavorite: contact.isFavorite_c || false,
        createdAt: contact.CreatedOn || new Date().toISOString(),
        updatedAt: contact.ModifiedOn || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching contacts by category:", error?.response?.data?.message || error);
      return [];
    }
  }
};

export const categoryService = {
  // Get all categories
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('categories_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}}
        ]
      });

      if (!response.success) {
        console.error("Error fetching categories:", response.message);
        toast.error(response.message);
        return [];
      }

      // Handle empty or non-existent data
      if (!response?.data?.length) {
        return [];
      }

      // Map database fields to UI field names
      return response.data.map(category => ({
        Id: category.Id,
        name: category.name_c || category.Name || "",
        color: category.color_c || "#64748b"
      }));
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      return [];
    }
  },

  // Create new category
  create: async (categoryData) => {
    try {
      const apperClient = getApperClient();
      const params = {
        records: [{
          Name: categoryData.name,
          name_c: categoryData.name,
          color_c: categoryData.color || "#64748b"
        }]
      };

      const response = await apperClient.createRecord('categories_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} categories:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          const newCategory = successful[0].data;
          return {
            Id: newCategory.Id,
            name: newCategory.name_c || newCategory.Name || "",
            color: newCategory.color_c || "#64748b"
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error);
      return null;
    }
  }
};