import Model from './Model';
import {TaskItem} from './type';

export default class Controller{
    private model: Model;

constructor(){
    this.model = new Model();
}

     public getTodoList():TaskItem[] {
        return this.model.todoList;
      };
    
     public getTotalTask():number {
        return this.model.todoList.length;
      };
    
      public getCompletedTask ():number {
        return this.model.completed;
      };
    
      public addTask(task:TaskItem):void {
        this.model.todoList.push(task);
      };
    
      public deleteTask(task:TaskItem):void {
        const index:number = this.model.todoList.findIndex(item => item.name === task.name);
        this.model.todoList.splice(index, 1);
      };
    
      public setCurrentTask(task:TaskItem):TaskItem {
        return this.model.currentTask = task;
      };
    
      public completeTask():void {
        this.model.currentTask.complete = true;
        this.model.completed++;
      };
    
      public unCompleteTask():void {
        this.model.currentTask.complete = false;
        this.model.completed--;
      }
}