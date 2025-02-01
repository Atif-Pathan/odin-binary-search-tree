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
        console.log(array);
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
     
    isBalanced() {

    }

    rebalance() {

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
 
const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(t.root);
console.log("\n----------------------------------------------------\n");

t.insert(t.root, 0);
prettyPrint(t.root);

const r = t.deleteItem(t.root, 8);
prettyPrint(t.root);

// let levelOrderArr = []
// t.levelOrder(node => levelOrderArr.push(node.data));
// console.log(levelOrderArr);

// let inOrderArr = []
// t.inOrder(t.root, node => inOrderArr.push(node.data));
// console.log(inOrderArr);

// let preOrderArr = []
// t.preOrder(t.root, node => preOrderArr.push(node.data));
// console.log(preOrderArr);

// let postOrderArr = []
// t.postOrder(t.root, node => postOrderArr.push(node.data));
// console.log(postOrderArr);

// const node = t.find(t.root, 5);
// console.log(t.height(node));

// console.log(t.depth(node));

