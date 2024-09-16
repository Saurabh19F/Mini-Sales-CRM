const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Sample leads data
let leads = [
  { id: 1, name: 'Sachin R. Tichkule', phone: '+916360204812', email: 'Tichkule.Sachin@yahoo.com', status: 'Sold' },
  { id: 2, name: 'Tabrez Mirza Khan', phone: '+919382760455', email: 'Tees_Maar_Khan@hotmail.com', status: 'Not Sold' }
];

// Sample employees data
let employees = [
  { id: 1, name: 'Havildar Ishar Singh', role: 'Sales Manager', email: 'Keshri@yahoo.com.com', phone: '+918504629931' },
  { id: 2, name: 'Rustom Pavri', role: 'Sales Executive', email: 'CNC.Rustom@hotmail.com', phone: '+918056388512' }
];

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// API to fetch leads
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

// API to fetch employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// API to update lead status
app.put('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  leads = leads.map(lead => lead.id === parseInt(id) ? { ...lead, status } : lead);
  res.json({ success: true, message: 'Lead status updated' });
});

// API to add a new employee
app.post('/api/employees', (req, res) => {
  const { name, role, email, phone } = req.body;
  const newEmployee = {
    id: employees.length + 1,
    name,
    role,
    email,
    phone
  };
  employees.push(newEmployee);
  res.json({ success: true, message: 'Employee added successfully' });
});

// API to update employee details
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, role, email, phone } = req.body;

  employees = employees.map(employee =>
    employee.id === parseInt(id) ? { id: employee.id, name, role, email, phone } : employee
  );

  res.json({ success: true, message: 'Employee updated successfully' });
});

// API to delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(employee => employee.id !== parseInt(id));
  res.json({ success: true, message: 'Employee deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
