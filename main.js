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

    insert(value) {

    }

    delete(value) {

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