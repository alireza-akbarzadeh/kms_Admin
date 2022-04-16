import {User, Drive, Document, Team, Faq, Qa, Project, Task,UserEvaluate} from "../containers/admin/workspace";

export default [
    {id: 1, name: "User", url: "U", component: <User/>},
    {id: 2, name: "Drive", url: "D", component: <Drive/>},
    {id: 3, name: "Task", url: "T", component: <Task/>},
    {id: 5, name: "Project", url: "P", component: <Project/>},
    {id: 6, name: "Team", url: "T", component: <Team/>},
    {id: 7, name: "Document", url: "D", component: <Document/>},
    {id: 8, name: "Evaluate", url: "E", component: <UserEvaluate/>},
]