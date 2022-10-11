import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType={
    id: string,
     title: string, 
     filter: FilterValuesType
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'active'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])



    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });




    function addTask(listId:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
   
        setTasks({...tasks,[listId]:[newTask,...tasks[listId]]});

    }

    function changeStatus(listId:string,taskId: string, isDone: boolean) {
      //я хочу чтобы эта функция работала 
      //надо вызывать васю в тасках, потому что там мы будем искать нужную и менять ее значение на противоположную
      //васе нужна копия ключа 
      setTasks({...tasks,[listId]:tasks[listId].map(filtered=>filtered.id==taskId?{...filtered,isDone}:filtered)})



    // setTasks({...tasks, [listId]:[...tasks[listId]]})
    }


  
    function removeTask(listId:string,id: string) {
      //это значит что мы вставляем ключ и таски соответсвующего айди, потом фильтруем их
     setTasks({...tasks,[listId]:tasks[listId].filter(el=>el.id!==id)})
    }

    function changeFilter(value: FilterValuesType, listId:string) {
      
        setTodolists( todolists.map(filtered=>filtered.id===listId?{...filtered ,filter:value}:filtered) )
      }
  

    return (
        <div className="App">

            {
                todolists.map((el:any)=>{ 

                    
                    let tasksForTodolist=tasks[el.id]

                    if (el.filter === "active") {
                        tasksForTodolist=tasks[el.id].filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist=tasks[el.id].filter(t => t.isDone === true);
                    }

                  
                  
                      
                  
  
                
                    return(
                    <Todolist
                    key={el.id}
                    title={el.title}
                    listId={el.id}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
          />
                )
                  
                })
            }
          
        </div>
    );
}

export default App;


//мне надо починить фильтр, почему он не работает?
//надо менять данные внутри объекта массива, которых ну очень много