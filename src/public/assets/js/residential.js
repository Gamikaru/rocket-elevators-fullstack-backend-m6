// URL pointing to your backend endpoint
const url = 'http://localhost:3004/agents';

// Function to fetch data from the backend
const fetchData = async (region = '') => {
    let fetchUrl = url;
    if (region) {
        fetchUrl = `http://localhost:3004/agents-by-region?region=${region}`;
    }
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch agents:', error);
    }
};

const filterByRegion = async (region) => {
    // If 'all' is selected, pass an empty string to fetchData
    const response = await fetchData(region === 'all' ? '' : region);
    if (response && response.data) {
        // If 'region' is 'all', we're expecting .data to be the complete list of agents
        const tableRows = createTable(response.data);
        document.querySelector('#agents-table tbody').innerHTML = tableRows;
    } else {
        console.error('No agents data found:', response);
    }
};

// Function to create the table rows
const createTable = (agents) => {
    return agents.map(agent => {
        // Determine the color based on the rating
        let ratingColor = 'purple'; // Default color
        if (agent.rating === 100) ratingColor = 'green';
        else if (agent.rating >= 90) ratingColor = 'blue';

        return `
            <tr>
                <td>${agent.first_name} ${agent.last_name}</td>
                <td style="color: ${ratingColor};">${agent.rating}</td>
                <td>${agent.fee.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>
        `;
    }).join('');
};

// Function to render the data in the table
const renderData = async () => {
    const agents = await fetchData();
     filterByRegion(); // Fetches all agents without filtering by region
    if (agents) {
        const tableRows = createTable(agents.data); // Assuming the agents are in a property called 'data'
        document.querySelector('#agents-table tbody').innerHTML = tableRows;
    }

    
};

// functions for sorting the table by the selected column header (onclick event). 
const sortTableByRating = (() => {
    let sortDirection = 'ascending';
    return () => {
        const table = document.querySelector('#agents-table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // define the sort function
        const compareFunction = (a, b) => {
            const aRating = parseFloat(a.querySelector('td:nth-child(2)').textContent.replace(/[$,]/g, ''));
            const bRating = parseFloat(b.querySelector('td:nth-child(2)').textContent.replace(/[$,]/g, ''));

            if (sortDirection === 'ascending') {
                return aRating - bRating;
            } else {
                return bRating - aRating;
            }
        };

        // sort the rows using the compare function
        const sortedRows = rows.sort(compareFunction);

        // clear the current table body and re-append the sorted rows
        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));

        // Find the sort arrow span within this column
        const arrowSpan = document.querySelector('#sort-rating .sort-arrow');

        // Remove arrows from all headers first
        document.querySelectorAll('.sort-arrow').forEach(span => {
            span.classList.remove('asc', 'desc');
        });

        // Add the appropriate class based on sortDirection
        if (sortDirection === 'ascending') {
            arrowSpan.classList.add('asc');
        } else {
            arrowSpan.classList.add('desc');
        }

        // toggle the sort direction for the next call
        sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    }
}
)();


// Function for sorting the table by the 'Full Name' column with toggle
const sortTableByFullname = (() => {
    let sortDirection = 'ascending';
    return () => {
        const table = document.querySelector('#agents-table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Sort function that compares last names
        const compareFunction = (a, b) => {
            const getLastName = name => name.split(' ').pop().toLowerCase();
            const aLastName = getLastName(a.querySelector('td:first-child').textContent.trim());
            const bLastName = getLastName(b.querySelector('td:first-child').textContent.trim());

            if (sortDirection === 'ascending') {
                return aLastName.localeCompare(bLastName);
            } else {
                return bLastName.localeCompare(aLastName);
            }
        };

        // Sort the rows using the compare function
        const sortedRows = rows.sort(compareFunction);

        // Clear the current table body and re-append the sorted rows
        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));

        // Find the sort arrow span within this column
        const arrowSpan = document.querySelector('#sort-full-name .sort-arrow');

        // Remove arrows from all headers first
        document.querySelectorAll('.sort-arrow').forEach(span => {
            span.classList.remove('asc', 'desc');
        });

        // Add the appropriate class based on sortDirection
        if (sortDirection === 'ascending') {
            arrowSpan.classList.add('asc');
        } else {
            arrowSpan.classList.add('desc');
        }

        // Toggle the sort direction for the next call
        sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';

        
    };
})();

// function for sorting the table by the 'Fee' column with toggle
const sortTableByFee = (() => {
    let sortDirection = 'ascending';
    return () => {
        const table = document.querySelector('#agents-table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // define the sort function
        const compareFunction = (a, b) => {
            const aFee = parseFloat(a.querySelector('td:nth-child(3)').textContent.replace(/[$,]/g, ''));
            const bFee = parseFloat(b.querySelector('td:nth-child(3)').textContent.replace(/[$,]/g, ''));

            if (sortDirection === 'ascending') {
                return aFee - bFee;
            } else {
                return bFee - aFee;
            }
        };

        // sort the rows using the compare function
        const sortedRows = rows.sort(compareFunction);

        // clear the current table body and re-append the sorted rows
        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));

        // Find the sort arrow span within this column
        const arrowSpan = document.querySelector('#sort-fee .sort-arrow');

        // Remove arrows from all headers first
        document.querySelectorAll('.sort-arrow').forEach(span => {
            span.classList.remove('asc', 'desc');
        });

        // Add the appropriate class based on sortDirection
        if (sortDirection === 'ascending') {
            arrowSpan.classList.add('asc');
        } else {
            arrowSpan.classList.add('desc');
        }

        // toggle the sort direction for the next call
        sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    }
}
)();

// Add event listeners to the table headers for sorting
document.querySelector('#sort-rating').onclick = sortTableByRating;

document.querySelector('#sort-full-name').onclick = sortTableByFullname;

document.querySelector('#sort-fee').onclick = sortTableByFee;

// Call renderData when the DOM content is loaded
document.addEventListener('DOMContentLoaded', renderData);

