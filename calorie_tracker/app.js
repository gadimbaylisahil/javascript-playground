// Storage Controller
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
        items: [],
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
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        hideList: function(){
          document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        clearFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function (total) {
            document.querySelector(UISelectors.totalCalories).innerText = total;
        }
    }
})();

//--------------------------------------------------------------------------------------------
// App Controller
const App = (function (ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListners = function () {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();
        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
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
            // Clear fields
            UICtrl.clearFields();
        }
        ev.preventDefault();
    };


    // Public Interface
    return {
        init: function() {
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
            loadEventListners();
        }
    }
})(ItemCtrl, UICtrl);

App.init();