const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const nodemon = require("nodemon");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const getByID = await contacts.getContactById(id);
      console.log(getByID);
      break;

    case "add":
      const addNewContact = await contacts.addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      const removeByID = await contacts.removeContact(id);
      console.log(removeByID);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
