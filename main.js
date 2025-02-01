class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    mergeSort(array) {
        // base case
        if(array.length <= 1) {
            return array;
        } else {
            // split in two halves and sort each half
            let mid = Math.floor(array.length / 2);
            let sortedLeft = this.mergeSort(array.slice(0, mid));
            let sortedRight = this.mergeSort(array.slice(mid));
            
            //merge sortef halves
            let merged = [];
            
            // keep merging until one of the arrays becomes empty, causing loop to end
            while (sortedLeft.length && sortedRight.length) {
                merged.push(sortedLeft[0] < sortedRight[0] ? sortedLeft.shift() : sortedRight.shift());
            }
            
            // since one of the left or right arrays will be empty, doing this will append the non empty remaining array
            return merged.concat(sortedLeft, sortedRight);;
        }
    }

    buildTree(array) {
        array = [...new Set(this.mergeSort(array))];
        return this.createBST(array, 0, array.length - 1);
    }

    createBST(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = start + Math.floor((end - start) / 2);
        const root = new Node(array[mid]);
        root.leftChild = this.createBST(array, start, mid - 1);
        root.rightChild = this.createBST(array, mid + 1, end);
        return root;
    }

    insert(rootNode = this.root, value) {
        // base case: once we hit a leaf node, we create a new node with the value to be inserted
        if (rootNode === null) {
            return new Node(value);
        }
        if (value < rootNode.data) {
            // go left
            rootNode.leftChild = this.insert(rootNode.leftChild, value);
        } else if (value > rootNode.data) {
            // go right
            rootNode.rightChild = this.insert(rootNode.rightChild, value);
        }
        return rootNode;
    }

    deleteItem(rootNode = this.root, value) {
        // if empty tree
        if (rootNode === null) {
            // item not found
            return rootNode;
        }
        
        // if value to delete is greater than current nodes value,
        // we need to go search the RIGHT side of the tree, as that is where we might find it
        if (value > rootNode.data) {
            rootNode.rightChild = this.deleteItem(rootNode.rightChild, value);
        } 
        // else if value to delete is less than current nodes value,
        // we need to go search the LEFT side of the tree, as that is where we might find it
        else if (value < rootNode.data) {
            rootNode.leftChild = this.deleteItem(rootNode.leftChild, value);
        } else {
            // if we do find the value we have 3 cases:

            // if left child is null, return the right child
            if (rootNode.leftChild === null) {
                return rootNode.rightChild;
            } 
            // or if right child is null, return left child
            else if (rootNode.rightChild === null) {
                return rootNode.leftChild;
            }
            // this also takes care of no child cases as it will just return null and so 
            // parent will set its (left or right) child to null, effectively deleting that child

            // now if there are 2 children, then we need to find the minimum from the right subtree
            // as this will be the value that we can replace our deleted node with and then all values
            // in the right subtree will be greater than the repalced value. 
            // Can also do maximum value from left subtree, same concept.
            let curr = rootNode.rightChild; // go to the right subtree.
            while (curr !== null && curr.leftChild !== null) {
                // keep going left to find the min value
                curr = curr.leftChild;    
            }
            // now, we must first replace the value for the node being deleted, with this min value, essentially deleting it
            rootNode.data = curr.data;
            // once the data has been replaced, we have successfully deleted the value, but introduced a duplicate now
            // we must now delete the duplicate value = rootNode.data or curr.data (same value). And since we know that we
            // got that value from the right subtree, we make the root, the right subtree to start the search
            // then it will delete the node based on the above 2 cases (no child or 1 child) recursively
            rootNode.rightChild = this.deleteItem(rootNode.rightChild, curr.data);
        }
        return rootNode;
    }

    find(rootNode = this.root, value) {
        if (rootNode === null) {
            return null;
            // not found
        }
        if (value < rootNode.data) {
            // go left
            return this.find(rootNode.leftChild, value);
        } else if (value > rootNode.data) {
            // go right
            return this.find(rootNode.rightChild, value);
        } else {
            // found the node, so return that node
            return rootNode;
        }
    }

    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        // init queue with the root node
        let q = [this.root];
        while (q.length) {
            // deque first element
            let node = q.shift();
            callback(node); // adds the node value to an array
            if (node.leftChild) {
                q.push(node.leftChild);
            }
            if (node.rightChild) {
                q.push(node.rightChild);
            }
        }

    }

    inOrder(rootNode = this.root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if (rootNode === null) return;
        this.inOrder(rootNode.leftChild, callback);
        callback(rootNode);
        this.inOrder(rootNode.rightChild, callback);
    }

    preOrder(rootNode = this.root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if (rootNode === null) return;
        callback(rootNode);
        this.preOrder(rootNode.leftChild, callback);
        this.preOrder(rootNode.rightChild, callback);
    }

    postOrder(rootNode = this.root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if (rootNode === null) return;
        this.postOrder(rootNode.leftChild, callback);
        this.postOrder(rootNode.rightChild, callback);
        callback(rootNode);
    }

    height(node) {
        if (node === null) {
            // node to find doesnt exist
            return -1;
        }
        let leftH = this.height(node.leftChild);
        let rightH = this.height(node.rightChild);
        return 1 + Math.max(leftH, rightH);
    }

    depth(nodeToFind, current = this.root, count = 0) {
        if (current === null || nodeToFind === null) {
            // node to find doesnt exist
            return -1;
        }

        if (current === nodeToFind) {
            return count;
        }

        if (nodeToFind.data < current.data) {
            return this.depth(nodeToFind, current.leftChild, count + 1);
        } 

        if (nodeToFind.data > current.data) {
            return this.depth(nodeToFind, current.rightChild, count + 1);
        } 
    }

    checkBalance(rootNode = this.root) {
        if (rootNode === null) {
            // empty tree has height 0
            return 0;
        }

        let leftTreeHeight = this.checkBalance(rootNode.leftChild); 
        if (leftTreeHeight === -1) {
            return -1;
        }
        let rightTreeHeight = this.checkBalance(rootNode.rightChild);
        if (rightTreeHeight === -1) {
            return -1;
        }

        const absHeight = Math.abs(leftTreeHeight - rightTreeHeight);
        if (absHeight > 1) {
            return -1
        } else {
            return 1 + Math.max(leftTreeHeight, rightTreeHeight);
        }
    }
     
    isBalanced() {
        if (this.checkBalance(this.root) === -1) {
            return false;
        }
        return true;
    }

    rebalance() {
        if (!this.isBalanced()) {
            console.log("rebalancing..");   
            let newTreeArray = []
            this.inOrder(this.root, node => newTreeArray.push(node.data));
            this.root = this.buildTree(newTreeArray);
        }  
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
 
// --------------------------- TEST ALL FUNCTIONS ---------------------------

// Utility function to generate an array of random numbers
function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// 🟢 **Step 1: Create a BST from an array of random numbers (< 100)**
const randomNumbers = generateRandomArray(10, 100);
const tree = new Tree(randomNumbers);

console.log("✅ Initial Tree (Balanced BST Created)");
prettyPrint(tree.root);

// 🟢 **Step 2: Confirm if the tree is balanced**
console.log("\nIs the tree balanced?", tree.isBalanced()); // Expected: true

// 🟢 **Step 3: Store tree elements in arrays using traversal methods**
let levelOrderArr = [];
let preOrderArr = [];
let postOrderArr = [];
let inOrderArr = [];

tree.levelOrder(node => levelOrderArr.push(node.data));
tree.preOrder(tree.root, node => preOrderArr.push(node.data));
tree.postOrder(tree.root, node => postOrderArr.push(node.data));
tree.inOrder(tree.root, node => inOrderArr.push(node.data));

// 🟢 **Step 4: Print traversal results**
console.log("\n🌲 Level Order Traversal:", levelOrderArr.join(" "));
console.log("🌲 Pre-Order Traversal:", preOrderArr.join(" "));
console.log("🌲 Post-Order Traversal:", postOrderArr.join(" "));
console.log("🌲 In-Order Traversal:", inOrderArr.join(" "));

// 🟢 **Step 5: Insert nodes to make the tree unbalanced**
tree.insert(tree.root, 150);
tree.insert(tree.root, 200);
tree.insert(tree.root, 300);
tree.insert(tree.root, 250);
tree.insert(tree.root, 400);

console.log("\n⚠️ Inserted values > 100 to unbalance the tree");
prettyPrint(tree.root);

// 🟢 **Step 6: Confirm the tree is now unbalanced**
console.log("\nIs the tree balanced after insertions?", tree.isBalanced()); // Expected: false

// 🟢 **Step 7: Test `find()` method**
const searchValue = randomNumbers[3]; // Pick a random number that should exist
const foundNode = tree.find(tree.root, searchValue);
console.log(`\n🔎 Searching for value ${searchValue}...`, foundNode ? `Found ✅ (Node: ${foundNode.data})` : "Not Found ❌");

// 🟢 **Step 8: Test `height()` method**
const rootHeight = tree.height(tree.root);
console.log(`\n📏 Height of root node: ${rootHeight}`);

// 🟢 **Step 9: Test `depth()` method**
const depthOfNode = tree.depth(tree.root.rightChild);
console.log(`\n📏 Depth of right child of root: ${depthOfNode}`);

// 🟢 **Step 10: Test `deleteItem()` method**
console.log(`\n🗑️ Deleting ${searchValue} from the tree...`);
tree.deleteItem(tree.root, searchValue);
console.log(`Tree after deleting ${searchValue}:`);
prettyPrint(tree.root);
console.log("\nChecking if deleted value still exists:", tree.find(tree.root, searchValue) ? "Still present ❌" : "Deleted ✅");

// 🟢 **Step 11: Rebalance the tree**
console.log("\n🔄 Rebalancing the tree...");
tree.rebalance();
prettyPrint(tree.root);

// 🟢 **Step 12: Confirm the tree is balanced again**
console.log("\nIs the tree balanced after rebalancing?", tree.isBalanced()); // Expected: true

// 🟢 **Step 13: Store tree elements again after rebalancing**
levelOrderArr = [];
preOrderArr = [];
postOrderArr = [];
inOrderArr = [];

tree.levelOrder(node => levelOrderArr.push(node.data));
tree.preOrder(tree.root, node => preOrderArr.push(node.data));
tree.postOrder(tree.root, node => postOrderArr.push(node.data));
tree.inOrder(tree.root, node => inOrderArr.push(node.data));

// 🟢 **Step 14: Print the tree again after rebalancing**
console.log("\n🌲 Level Order Traversal:", levelOrderArr.join(" "));
console.log("🌲 Pre-Order Traversal:", preOrderArr.join(" "));
console.log("🌲 Post-Order Traversal:", postOrderArr.join(" "));
console.log("🌲 In-Order Traversal:", inOrderArr.join(" "));

console.log("\n🎉 BST successfully tested and verified!");


