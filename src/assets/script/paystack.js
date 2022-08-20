const REQUEST_URL = 'https://dev.dumena.com/payments/verify';
const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmViZDNiYzBmMGIxNjI2ZTI4NzlmOSIsImZ1bGxuYW1lIjoiQ2hpYnV6byBPa29sbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2MDAwMzI4NSwiZXhwIjoxNjYwMDg5Njg1fQ.lCe1wz1UZpU05_8JgEfGyKUr-L1N_HeSBd3K8rvlNXk';
const amount = 15000 * 100;
const email = 'chibuzo@gmail.com';
const order_reference = 'ORD_0c1hrl63g9l87u2';

function payWithPaystack() {
    var handler = PaystackPop.setup({
        key: 'pk_test_d586eb9d6d6ec62439571f56fea7c8330e4d4366', // Replace with your public key
        email,
        amount, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        //ref: order_reference, // Replace with a reference you generated
        callback: function ({ reference }) {
            //this happens after the payment is completed successfully

            // Make an AJAX call to your server with the reference to verify the transaction
            fetch(REQUEST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${auth_token}`
                },
                body: JSON.stringify({ reference })
            }).then(res => res.json()).then(data => console.log({ data }));
        },

        onClose: function () {
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
}

function greet(){
    alert("Hello");
 }
 
 alert("Pop up");