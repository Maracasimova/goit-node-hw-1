const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    if (!contacts.length) {
      console.log("No contacts found.");
      return;
    }

    console.table(contacts);
  } catch (error) {
    console.error("Error listing contacts:", error);
  }
}

async function getContactById(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = contacts.find((c) => c.id === id);
    return contact || null;
  } catch (error) {
    console.error("Error retrieving contact:", error);
    return null;
  }
}

async function removeContact(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const updatedContacts = contacts.filter((c) => c.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return updatedContacts.length !== contacts.length;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      console.warn("This name already exists!");
      return null;
    }

    if (contacts.find((contact) => contact.email === email)) {
      console.warn("This email already exists!");
      return null;
    }

    if (contacts.find((contact) => contact.phone === phone)) {
      console.warn("This phone already exists!");
      return null;
    }

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

    console.log("Contact added successfully! New list of contacts:".magenta);
    console.table(contacts);

    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
