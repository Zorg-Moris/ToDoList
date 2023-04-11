import {TaskItem} from './type';

export default class Model{

    private defaultTasks:Array<TaskItem> = [  {
        name: 'test',
        complete: false
    },
    {
        name: 'test1',
        complete: false
    }]

   public currentTask:TaskItem;
   public completed:number;
   public todoList:Array<TaskItem> = [...this.defaultTasks];
}
