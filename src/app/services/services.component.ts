import { StateService } from './../../../../../dproz-ui/src/app/shared/services/state.service';
import { Inject, Component, OnInit, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { ServicesService } from '../shared/services/services.service';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  "Construction": {
       2: "Tall Buildings",
     3 :"Residential Houses",
      5:  "Offices"}
  ,
   "Trades Middle Man": [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: object, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null && value != 0) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dproz-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [StateService]
 
})
export class ServicesComponent implements OnInit {

  ngOnInit(): void {
  //  throw new Error("Method not implemented.");
  this.user_ref  = localStorage.getItem("user-reference");
  this.user = JSON.parse(localStorage.getItem("user_details"));
  console.log(TREE_DATA["Construction"]);
//  this.user
  }

  animal: string;
  name: string;
  user_ref:string;
  user;

  constructor(public dialog: MatDialog, private services: ServicesService) {
    
    services.getServiceCategories().subscribe( x => {
      console.log(x);
    });
    
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '400px',
     
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.animal = result;
    });

  }
}

@Component({
  selector: 'edit-service',
  templateUrl: './edit-service-dialog.html',
  providers: [ChecklistDatabase],
})

export class EditServiceComponent {
/** Map from flat node to nested node. This helps us finding the nested node to be modified */
flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

/** Map from nested node to flattened node. This helps us to keep the same object for selection */
nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

/** A selected parent node to be inserted */
selectedParent: TodoItemFlatNode | null = null;

/** The new item's name */
newItemName = '';

treeControl: FlatTreeControl<TodoItemFlatNode>;

treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

/** The selection for checklist */
checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
// constructor(
//   public dialogRef: MatDialogRef<EditServiceComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: DialogData)
//    {
   
//    }
constructor( public dialogRef: MatDialogRef<EditServiceComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, private database: ChecklistDatabase) {
  this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  database.dataChange.subscribe(data => {
    this.dataSource.data = data;
  });
}

getLevel = (node: TodoItemFlatNode) => node.level;

isExpandable = (node: TodoItemFlatNode) => node.expandable;

getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

/**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
transformer = (node: TodoItemNode, level: number) => {
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
  flatNode.item = node.item;
  flatNode.level = level;
  flatNode.expandable = !!node.children;
  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);
  return flatNode;
}

/** Whether all the descendants of the node are selected */
descendantsAllSelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  return descendants.every(child => this.checklistSelection.isSelected(child));
}

/** Whether part of the descendants are selected */
descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const result = descendants.some(child => this.checklistSelection.isSelected(child));
  return result && !this.descendantsAllSelected(node);
}

/** Toggle the to-do item selection. Select/deselect all the descendants node */
todoItemSelectionToggle(node: TodoItemFlatNode): void {
  this.checklistSelection.toggle(node);
  const descendants = this.treeControl.getDescendants(node);
  this.checklistSelection.isSelected(node)
    ? this.checklistSelection.select(...descendants)
    : this.checklistSelection.deselect(...descendants);
}

/** Select the category so we can insert the new item. */
addNewItem(node: TodoItemFlatNode) {
  const parentNode = this.flatNodeMap.get(node);
  this.database.insertItem(parentNode!, '');
  this.treeControl.expand(node);
}

/** Save the node to database */
saveNode(node: TodoItemFlatNode, itemValue: string) {
  const nestedNode = this.flatNodeMap.get(node);
  this.database.updateItem(nestedNode!, itemValue);
}
 

  onNoClick(): void {
    this.dialogRef.close(this.checklistSelection);
  }

}
