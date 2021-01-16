const express = require('express');
const route = express.Router();
let accounts = require('./database');
const e = require('express');


// Get request
route.get('/accounts', (req, res) => {
    res.json({ userData: accounts });
})

// post request
route.post('/accounts', (req, res) => {
    const incomingAccount = req.body;
    console.log(incomingAccount);
    accounts.push(incomingAccount);
    res.json(accounts)
})

// for particular user data ex id:2
route.get('/accounts/:id', (req, res) => {
    const accountId = Number(req.params.id);
    const getAccount = accounts.find((account) => account.id === accountId);
    if (!getAccount) {
        res.status(500).send('Account not found');

    } else {
        // Note- responsing data in array form 
        res.json({ userData: [getAccount] })

    }
})

// put method
route.put('/accounts/:id', (req, res) => {
    const accountId = Number(req.params.id);
    const body = req.body;
    const account = accounts.find((account) => account.id === accountId);
    const index = accounts.indexOf(account);
    if (!account) {
        res.status(505).send('Account not found')
    } else {
        const updatedAccount = { ...account, ...body };
        accounts[index] = updatedAccount;
        res.send(updatedAccount)
    }
})

// delete method
route.delete('/accounts/:id', (req, res) => {
    const accountId = req.params.id;
    const newAccounts = accounts.filter((account) => account.id !== accountId)
    if (!newAccounts) {
        res.status(505).send('account not found');
    } else {
        accounts = newAccounts;
        res.send(accounts)
    }
})

module.exports = route;