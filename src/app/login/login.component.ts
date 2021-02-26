import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message/message.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  password = '';
  login = '';
  errorMessage = '';


  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  isHidden(): boolean {
    return this.errorMessage.length === 0;
  }

  onSubmit(): void {
    if (this.login === '' && this.password === ''){
      this.errorMessage = 'vous devez saisir un mot de passe / et ou votre identifiant';
    }else {

      this.errorMessage = '';
      this.auth.sendLogin(this.login, this.password).subscribe(value => {
        this.auth.finalizeAuthentication(value);
        if (this.auth.isAuthenticated) {
          this.router.navigateByUrl('cours');
        } else {
          console.log('Not connected');
          this.errorMessage = 'Erreur dans votre login ou votre password';
        }
      });
      // const form = new FormData();
      // form.append('login', this.login);
      // form.append('password', this.password);
      // this.service.sendMessage('checkLogin', form).subscribe(value => {
      //   console.log(value.status);
      //   if ( value.status === 'error' ){
      //     this.errorMessage = 'log/pass invalide';
      //   }else{
      //     this.router.navigateByUrl('/cours');
      //   }
      // });


    }
  }
}
