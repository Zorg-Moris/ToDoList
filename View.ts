import Controller from "./Controller";
import { TaskItem } from "./type";

export default class View {
  private controller:Controller;
  private tasksContainer;
  private taskItemList:TaskItem[] = [];
  private todoContainer:any;


constructor(){ 
  this.controller = new Controller()
}
  public init():void {
      this.taskItemList = this.controller.getTodoList();
      this.loadTodoList();
      this.updateTotal();

      document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.addNewTask();
        }
      });
    };
    
   public loadTodoList():void {
    this.tasksContainer = document.querySelector('.tasks');
      this.tasksContainer.innerHTML = '';
      for (const task of this.taskItemList) {
        const div:HTMLDivElement = document.createElement('div');
        div.classList.add('task');
        const p:HTMLParagraphElement = document.createElement('p');
        p.textContent = task.name;
        const btn:HTMLElement = document.createElement('button');
        btn.classList.add('delete');
        btn.textContent = 'x';
        div.appendChild(p);
        div.appendChild(btn);
        this.todoContainer.appendChild(div)
  
        p.addEventListener('click', () => {
          this.controller.setCurrentTask(task);
          p.classList.toggle('completed');
          if (p.classList.contains('completed')) {
            this.controller.completeTask();
            this.updateComplete();
          } else {
            this.controller.unCompleteTask();
            this.updateComplete();
          }
        });
  
        btn.addEventListener('click', () => {
          this.controller.deleteTask(task);
          btn.parentNode?.removeChild(btn);
          this.updateTotal();
        });
      }
    };
  
  public updateTotal():void {
      const taskCount = document.querySelector('#count')!;
      const taskTotal = this.controller.getTotalTask();
      taskCount.innerHTML = `Task: <span>${taskTotal}</span>`;
    };
    
    addNewTask():void {
      const taskText:HTMLInputElement = document.querySelector('#input')!;
      const newTask:TaskItem = {
        name: taskText?.value,
        complete: false
      };
      this.controller.addTask(newTask);
      const div:HTMLDivElement = document.createElement('div');
      div.classList.add('task');
      const p:HTMLParagraphElement= document.createElement('p');
      p.textContent = newTask.name;
      const btn:HTMLElement = document.createElement('button');
      btn.classList.add('delete');
      btn.textContent = 'x';
      div.appendChild(p);
      div.appendChild(btn);
      this.todoContainer.appendChild(div);
  
      p.addEventListener('click', () => {
        this.controller.setCurrentTask(newTask);
        p.classList.toggle('completed');
        if (p.classList.contains('completed')) {
          this.controller.completeTask();
          this.updateComplete();
        } else {
          this.controller.unCompleteTask();
          this.updateComplete();
        }
      });
      
      btn.addEventListener('click', () => {
        this.controller.deleteTask(newTask);
        btn.parentNode?.removeChild(btn);
        this.updateTotal();
      });  
        
      this.updateTotal();
      taskText.value = '';
    };
    
    updateComplete():void {
      const tasksCompleted:Element  = document.querySelector('#completed')!;
      const taskCompleted:number = this.controller.getCompletedTask();
      tasksCompleted.innerHTML = `Completed: <span>${taskCompleted}</span>`;
    }
  };