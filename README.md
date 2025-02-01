# Binary Search Tree Implementation

## 📌 Overview
This project is a full implementation of a **Binary Search Tree (BST)** in JavaScript. It includes key operations such as insertion, deletion, searching, height/depth calculation, and traversal methods. Additionally, the tree can be rebalanced when it becomes unbalanced.

## ⚡ Features
✅ **Binary Search Tree (BST) Implementation**  
✅ **Node Insertion & Deletion**  
✅ **Tree Traversals (Level-order, Pre-order, Post-order, In-order)**  
✅ **Tree Height & Depth Calculation**  
✅ **Check if the tree is balanced**  
✅ **Rebalancing an Unbalanced Tree (Not Self-Balancing)**  
✅ **Test Script to Validate Functionality**  

## 🔧 Technologies Used
- **JavaScript** (ES6+)
- **Node.js** (for execution in local environments)

## 🎯 What I Learned
- **Recursive Tree Construction:** Building a BST from a sorted array while maintaining balance.
- **Tree Traversal Algorithms:** Implementing Level-order, Pre-order, Post-order, and In-order traversals.
- **Balancing a BST:** Extracting nodes in sorted order and rebuilding a balanced tree (⚠️ *Note:* This is not self-balancing like AVL or Red-Black trees).
- **Understanding Tree Depth & Height:** How depth and height differ and how to compute them recursively.
- **Time & Space Complexity Considerations:** 
  - **Insertion/Search/Delete:** Average **O(log N)**, Worst **O(N)** (Unbalanced BST)
  - **Rebalance Operation:** **O(N)** due to sorting and rebuilding
  - **Space Complexity:** **O(N)** for traversal storage

## 📂 Project Structure
```
├── main.js       # Main implementation of BST (including test functions)
├── README.md     # Project documentation
```

## 🚀 How to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/bst-project.git
   ```
2. Navigate into the project folder:
   ```sh
   cd bst-project
   ```
3. Run the main script:
   ```sh
   node main.js
   ```

## 💡 Try It Yourself
You can create your own BST by modifying `main.js` and inserting values manually:
```js
const tree = new Tree([10, 5, 15, 2, 7, 12, 20]);
tree.insert(tree.root, 25);
tree.insert(tree.root, 30);
console.log(tree.isBalanced()); // false
tree.rebalance();
console.log(tree.isBalanced()); // true
```

## 🔮 Future Enhancements
🚀 **Self-Balancing BST** (e.g., AVL or Red-Black Tree with automatic rotations)  
🖥️ **User Interface (UI) for Visualization**  
📊 **Graphical Representation** of the tree for better debugging  
⚡ **Performance Optimizations** for insertion/deletion efficiency  

## 🎯 Conclusion
This project provided hands-on experience with **binary search trees**, **recursion**, and **algorithm optimization** and reinforced important data structure concepts.

