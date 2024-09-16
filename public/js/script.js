// Fetch leads from the backend
function fetchLeads() {
  fetch('/api/leads')
    .then(response => response.json())
    .then(leads => {
      const leadContainer = document.getElementById('lead-container');
      leadContainer.innerHTML = '';  // Clear previous leads

      leads.forEach(lead => {
        const leadElement = document.createElement('div');
        leadElement.classList.add('lead', 'mb-3', 'p-3', 'border', 'border-secondary', 'rounded');
        leadElement.innerHTML = `
          <h3>${lead.name}</h3>
          <p>Phone: <a href="tel:${lead.phone}">${lead.phone}</a></p>
          <p>Email: <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p>Status: <strong>${lead.status}</strong></p>
          <button class="btn btn-success mark-sold" data-id="${lead.id}">Mark Sold</button>
          <button class="btn btn-danger mark-not-sold" data-id="${lead.id}">Mark Not Sold</button>
        `;
        leadContainer.appendChild(leadElement);
      });
    });
}


// Fetch employees from the backend
function fetchEmployees() {
  fetch('/api/employees')
    .then(response => response.json())
    .then(employees => {
      const employeeContainer = document.getElementById('employee-container');
      employeeContainer.innerHTML = '';  // Clear previous employees

      employees.forEach(employee => {
        const employeeElement = document.createElement('div');
        employeeElement.classList.add('employee', 'mb-3', 'p-3', 'border', 'border-secondary', 'rounded');
        employeeElement.innerHTML = `
          <h3>${employee.name}</h3>
          <p>Role: ${employee.role}</p>
          <p>Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
          <p>Phone: <a href="tel:${employee.phone}">${employee.phone}</a></p>
          <button class="btn btn-danger delete-employee" data-id="${employee.id}">Delete</button>
        `;
        employeeContainer.appendChild(employeeElement);
      });
    });
}

function updateLeadStatus(id, status) {
  fetch(`/api/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      fetchLeads();  // Refresh leads after update
    }
  });
}

// Handle button clicks for "Mark Sold" and "Mark Not Sold"
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('mark-sold')) {
    const leadId = event.target.getAttribute('data-id');
    updateLeadStatus(leadId, 'Sold');
  } else if (event.target.classList.contains('mark-not-sold')) {
    const leadId = event.target.getAttribute('data-id');
    updateLeadStatus(leadId, 'Not Sold');
  }
});

// Add a new employee
document.getElementById('employee-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role, email, phone })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      fetchEmployees();  // Refresh employee list
    }
  });

  // Clear form
  document.getElementById('employee-form').reset();
});

// Handle employee deletion
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-employee')) {
    const employeeId = event.target.getAttribute('data-id');
    fetch(`/api/employees/${employeeId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchEmployees();  // Refresh employee list after deletion
      }
    });
  }
});

// Fetch leads and employees on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchLeads();
  fetchEmployees();
});
