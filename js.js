// 1. Database for Summer Collection (IDs 9 to 16)
const products = [
    { id: 9, name: "Summer Cartoon Astronaut T-Shirt 1", price: 600, image: "img/products/f1.jpg", brand: "adidas", description: "Premium cotton fabric with a modern summer design." },
    { id: 10, name: "Summer Cartoon Astronaut T-Shirt 2", price: 300, image: "img/products/f2.jpg", brand: "adidas", description: "Vibrant summer colors and durable material." },
    { id: 11, name: "Summer Cartoon Astronaut T-Shirt 3", price: 959, image: "img/products/f3.jpg", brand: "adidas", description: "Ultra-soft fabric providing maximum comfort during hot days." },
    { id: 12, name: "Summer Cartoon Astronaut T-Shirt 4", price: 899, image: "img/products/f4.jpg", brand: "adidas", description: "Breathable material and perfect for summer heat." },
    { id: 13, name: "Summer Cartoon Astronaut T-Shirt 5", price: 900, image: "img/products/f5.jpg", brand: "adidas", description: "A versatile wardrobe essential for your summer collection." },
    { id: 14, name: "Summer Cartoon Astronaut T-Shirt 6", price: 200, image: "img/products/f6.jpg", brand: "adidas", description: "Trendy pattern for a fresh and cool summer look." },
    { id: 15, name: "Summer Cartoon Astronaut T-Shirt 7", price: 270, image: "img/products/f7.jpg", brand: "adidas", description: "Detailed patterned design crafted from luxury materials." },
    { id: 16, name: "Summer Cartoon Astronaut T-Shirt 8", price: 770, image: "img/products/f8.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 20, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n1.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 21, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n2.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 22, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n3.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 23, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n4.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 24, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n5.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 25, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n6.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 26, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n7.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    { id: 27, name: "Summer Cartoon Astronaut T-Shirt 9", price: 600, image: "img/products/n8.jpg", brand: "adidas", description: "Our best-selling classic summer design." },
    





];

// 2. Global Cart Counter (Updates the badge icon above the cart on ALL pages)
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
    }
}

// 3. Load Details in Details Page
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = products.find(p => p.id == id);

    if (product) {
        if(document.getElementById("MainImg")) document.getElementById("MainImg").src = product.image;
        if(document.getElementById("prodName")) document.getElementById("prodName").innerText = product.name;
        if(document.getElementById("prodPrice")) document.getElementById("prodPrice").innerText = `$${product.price}`;
        if(document.getElementById("prodDesc")) document.getElementById("prodDesc").innerText = product.description;
        if(document.getElementById("prodBrand")) document.getElementById("prodBrand").innerText = "Home / " + product.brand;















const addToCartBtn = document.querySelector(".single-pro-details button");
        if (addToCartBtn) {
            addToCartBtn.onclick = function() {
                const quantityInput = document.querySelector(".single-pro-details input");
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                addToCart(product, quantity);
            };
        }
    }
}

// 4. Add Product to LocalStorage
function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    updateCartBadge();
    alert("Product added to cart successfully!");
}

// 5. Dynamic Cart Page Logic (Fills your <tbody> and calculates totals)
function displayCart() {
    const cartTableBody = document.querySelector("#cart tbody");
    if (!cartTableBody) return; // Exit if we are not on the cart.html page

    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    cartTableBody.innerHTML = ""; // Clear static HTML design

    if (cart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='6'>Your cart is empty!</td></tr>";
        updateOrderTotals(0);
        return;
    }

    let subtotalAll = 0;

    cart.forEach((item, index) => {
        let itemSubtotal = item.price * item.quantity;
        subtotalAll += itemSubtotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${itemSubtotal}</td>
        `;
        cartTableBody.appendChild(row);
    });

    updateOrderTotals(subtotalAll);
}

// 6. Update Quantity directly from the Cart table input
function updateQuantity(index, newQty) {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    if(newQty < 1) newQty = 1;
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// 7. Remove item from Cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    cart.splice(index, 1); // Delete item from array
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// 8. Update Cart Subtotal and Grand Total elements
function updateOrderTotals(subtotal) {
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");
    
    if (subtotalElement) subtotalElement.innerText = `$${subtotal}`;
    if (totalElement) totalElement.innerText = `$${subtotal}`; // Shipping is Free
}

// 9. Run functions on load
window.onload = function() {
    loadProductDetails();
    displayCart();
    updateCartBadge();
};
document.addEventListener("DOMContentLoaded", function() {
    
    const contactForm = document.querySelector("#contact-form form") || document.querySelector("form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // منع الصفحة من الريفرش عشان البيانات ما تضيعش

            const nameInput = contactForm.querySelector("input[type='text']") || contactForm.querySelector("[placeholder*='Name']");
            const emailInput = contactForm.querySelector("input[type='email']") || contactForm.querySelector("[placeholder*='mail']");
            const messageInput = contactForm.querySelector("textarea");

            // تأكيد إن الخانات موجودة والمستخدم كتب فيها
            if (nameInput && emailInput && messageInput) {
                const name = nameInput.value;
                const email = emailInput.value;
                const message = messageInput.value;

                // 1. سحب الرسايل القديمة المتسجلة في المتصفح (لو في)، أو عمل مصفوفة فاضية
                let feedbackList = JSON.parse(localStorage.getItem("userFeedbacks")) || [];

                // 2. إضافة الرسالة الجديدة للمصفوفة
                feedbackList.push({
                    userName: name,
                    userEmail: email,
                    userMessage: message,
                    date: new Date().toLocaleDateString() // بيسجل تاريخ الرسالة كمان
                });

                // 3. حفظ المصفوفة الجديدة في الـ Local Storage (عشان تفضل محفوظة للأبد)
                localStorage.setItem("currentUser", JSON.stringify(feedbackList));

                // تنبيه للمستخدم إن الرسالة وصلت وتفريغ الخانات
                alert(`Thank you ${name}! Your message has been saved in Local Storage.`);
                contactForm.reset();
            }
        });
    }
});

// Checkout Order Logic (Fixed JSON Parsing)
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      e.preventDefault(); 

      // 1. Get the raw string data from Local Storage
      const rawData = localStorage.getItem("currentUser"); 

      // Check if data doesn't exist
      if (!rawData) {
        alert("Please log in first to complete your order!");
        window.location.href = "login.html"; 
        return;
      }

      try {
        // 2. Parse the JSON data safely
        const userData = JSON.parse(rawData);
        let userName = "";

        // 3. Extract the name depending on if it's an Array or a single Object
        if (Array.isArray(userData) && userData.length > 0) {
          // Get userName from the very last registered user in the array
          userName = userData[userData.length - 1].userName; 
        } else if (userData.userName) {
          userName = userData.userName;
        }

        // 4. Validate the extracted name
        if (!userName || userName.trim() === "") {
          alert("Please log in first to complete your order!");
          window.location.href = "/websit/connect.html";
        } else {
          // Display a clean, professional success message
          alert(`Thank you ${userName}! Your order has been placed successfully.`);
          localStorage.removeItem("shoppingCart"); // Clear cart
          window.location.href = "/websit/index.html"; // Redirect to home
        }

      } catch (error) {
        // Fallback if the data in storage is just a plain string, not JSON
        alert(`Thank you ${rawData}! Your order has been placed successfully.`);
        localStorage.removeItem("shoppingCart");
        window.location.href = "/websit/Cart.html";
      }
    });
  }
});
