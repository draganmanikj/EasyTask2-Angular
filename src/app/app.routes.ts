import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch:CanMatchFn = (route, segmments) => {
    const router = inject(Router)
    const shouldGetAccess = Math.random();
    if(shouldGetAccess){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Task selected',
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        canMatch: [dummyCanMatch],
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'prefix'
            },
            {
                path: 'tasks',
                component: TasksComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                canDeactivate: [canLeaveEditPage]
            }
        ],
        data: {
            message: "Hello"
        },
        // resolve: {
        //     userName: resolveUserName
        // }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]