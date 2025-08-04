const API_URL = 'https://6889aed84c55d5c7395318b4.mockapi.io/users'; // Mock API manzilingiz bilan almashtiring

// Kontaktlarni olish va ko'rsatish (GET)
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        contacts.forEach(contact => {
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact-item';
            contactDiv.innerHTML = `
                <div>
                    <strong>${contact.name}</strong><br>
                    Raqam: ${contact.number}
                </div>
                <button class="delete-btn" data-id="${contact.id}"><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn" data-id="${contact.id}"><i class="fa-solid fa-edit"></i></button>
            `;
            contactList.appendChild(contactDiv);
        });

        
    } 
    catch (error) {
        console.error('Kontaktlar olishda xato:', error);
    }
}






// Forma yuborilganda (POST)
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                number
            })
        });

        if (response.ok) {
            console.log('Kontakt muvaffaqiyatli qo\'shildi');
            document.getElementById('contactForm').reset();
            fetchContacts(); // Kontaktlar ro'yxatini yangilash
        } else {
            console.log('Kontakt qo\'shishda xato');
        }
    } catch (error) {
        console.error('Kontakt qo\'shishda xato:', error);
    }
});

// Sahifa yuklanganda kontaktlarni olish
fetchContacts();