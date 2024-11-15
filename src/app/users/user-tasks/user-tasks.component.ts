import { Component, input, inject, computed, OnInit, DestroyRef} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  private usersService = inject(UsersService);
  userName = '';
  userId = '';
  message = input.required<string>()
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => (
        (this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || ''),
        (this.userId =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.id || '')
      ),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    console.log(this.activatedRoute);
  }
}

// export const resolveUserName: ResolveFn<string> = (
//   activatedRoute: ActivatedRouteSnapshot,
//   roouterState: RouterStateSnapshot
// ) => {
//   const usersService = inject(UsersService);
//   const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || ''
//   return userName;
// };
