const { Message } = require('./script');

test('Message function updates the h1 text', () => {
    // Create a minimal DOM structure
    document.body.innerHTML = `
        <h1>Welcome to My Webpage</h1>
        <button>Click Me</button>
    `;

    // Attach the Message function to the button click event
    const button = document.querySelector('button');
    button.onclick = Message;

    // Simulate a button click
    button.click();

    // Check if the h1 text has been updated
    const h1 = document.querySelector('h1');
    expect(h1.textContent).toBe('Hello, World!');
});