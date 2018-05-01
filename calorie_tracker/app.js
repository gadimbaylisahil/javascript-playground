// Storage Controller
const StorageCtrl = (function () {
    // Public Interface
    return {
        storeItem: function (item) {
            let items;
            // Check to see if any items
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        removeFromStorage: function (item) {
            let items = JSON.parse(localStorage.getItem('items'));

        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function (item, index) {
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemStorage: function (deletedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function (item, index) {
                if(item.id === deletedItem.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemsStorage: function () {
            localStorage.removeItem('items');
        }
    }
})();




//--------------------------------------------------------------------------------------------

// Item Controller
const ItemCtrl = (function () {
    // Private Interface
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    };

    // Public Interface
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create an ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // calories to number
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories);

            // Add to Items Array
            data.items.push(newItem);
            return newItem;
        },
        getItemById: function(id){
          let found = null;
          // Loop through items
            data.items.forEach(function (item) {
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories){
            // Calories to number
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function (item) {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        clearItems: function(){
            // Data Structure
            data.items = [];
            data.currentItem = null;
            data.totalCalories = 0;
        },
        deleteItem: function(itemToDeleteId){
            const ids = data.items.map(function (item) {
                return item.id;
            });

            const index = ids.indexOf(itemToDeleteId);
            data.items.splice(index, 1);
        },
        setCurrentItem: function(item){
          data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function () {
            let totalCalories = 0;
            data.items.forEach(function (item) {
                totalCalories += item.calories;
            });

            // Set this in data structure
            data.totalCalories = totalCalories;
            return data.totalCalories;
        }
    }
})();
//--------------------------------------------------------------------------------------------
// UI Controller
const UICtrl = (function () {
    // Private Interface
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        clearBtn: '.clear-btn',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn'
    };
    // Public Interface
    return {
        populateItemList: function (items) {
            let html = '';
            items.forEach(function (item) {
                // language=HTML
                html += `<li id="item-${item.id}" class="collection-item">
                            <strong>
                                ${item.name}:
                            </strong>
                            <em>
                                ${item.calories}
                                 Calories
                            </em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`;
            });
        // Insert List Items
        document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function () {
            return UISelectors
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (newItem) {
            //Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            li.id = `item-${newItem.id}`;
            //Add Html
            li.innerHTML = `<strong>
                                ${newItem.name}:
                            </strong>
                            <em>
                                ${newItem.calories}
                                 Calories
                            </em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`;
            // Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(updatedItem){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            // Turn nodelist into array
            listItems = Array.from(listItems);
            listItems.forEach(function (listItem) {
               const itemId = listItem.getAttribute('id');
               if(itemId === `item-${updatedItem.id}`){
                   document.querySelector(`#${itemId}`).innerHTML = `<strong>
                                ${updatedItem.name}:
                            </strong>
                            <em>
                                ${updatedItem.calories}
                                 Calories
                            </em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`;
               }
            });
        },
        clearItemsList: function () {
            document.querySelector('.collection').innerHTML = '';
        }
        ,
        deleteListItem: function(id){
            const toBeDeleted = document.querySelector(`#item-${id}`);
            toBeDeleted.remove();
        },
        hideList: function(){
          document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        clearFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        showTotalCalories: function (total) {
            document.querySelector(UISelectors.totalCalories).innerText = total;
        },
        clearEditState: function () {
            UICtrl.clearFields();
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function () {
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }
    }
})();

//--------------------------------------------------------------------------------------------
// App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();
        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // Back button
        document.querySelector(UISelectors.backBtn).addEventListener('click', function (ev) {
            UICtrl.clearEditState();
            ev.preventDefault();
        });
        // Clear button
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearItems);

        // Delete Item Event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //Disable submit on enter
        document.addEventListener('keypress', function (ev) {
           if(ev.keyCode === 13 || ev.which === 13){
               ev.preventDefault();
               return false;
           }
        });
        // Edit Icon Click Event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        // Update Item Event Listener
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    };
    const clearItems = function (ev) {
        ItemCtrl.clearItems();
        UICtrl.clearItemsList();
        UICtrl.clearEditState();
        UICtrl.hideList();
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Clear Items from Storage
        StorageCtrl.deleteItemsStorage();
        // Show calories in UI
        UICtrl.showTotalCalories(totalCalories);
        ev.preventDefault();
    };
    const itemAddSubmit = function (ev) {
        // Get ui input
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add new item to the UI
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Show calories in UI
            UICtrl.showTotalCalories(totalCalories);


            // Store in Local Storage
            StorageCtrl.storeItem(newItem);

            // Clear fields
            UICtrl.clearFields();
        }
        ev.preventDefault();
    };
    
    const itemDeleteSubmit = function (ev) {
        // Get current item ID
        const currentItemId = ItemCtrl.getCurrentItem().id;

        //Delete Item
        ItemCtrl.deleteItem(currentItemId);

        // Delete from list items UI
        UICtrl.deleteListItem(currentItemId);
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Show calories in UI
        UICtrl.showTotalCalories(totalCalories);
        // Delete from storage
        StorageCtrl.deleteItemStorage(ItemCtrl.getCurrentItem());
        UICtrl.clearEditState();
        ev.preventDefault();
    };
    const itemEditClick = function (ev) {
        if(ev.target.classList.contains('edit-item')){
            // get item id
            const listId = ev.target.parentElement.parentElement.id;
            // Break into an aray
            const listIdArr = listId.split('-');

            // get actual id
            const id = parseInt(listIdArr[1]);

            // get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // set to current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add Item to Form
            UICtrl.addItemToForm();
        }
        ev.preventDefault();
    };

    const itemUpdateSubmit = function (ev) {
        // Get item input
        const input = UICtrl.getItemInput();

        //Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Show it in the UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Show calories in UI
        UICtrl.showTotalCalories(totalCalories);
        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);
        UICtrl.clearEditState();
        ev.preventDefault();
    };


    // Public Interface
    return {
        init: function() {
            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();
            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                // Populat List with items
                UICtrl.populateItemList(items);
            }
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Show calories in UI
            UICtrl.showTotalCalories(totalCalories);
            // Load Event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();