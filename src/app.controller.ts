import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)//llama a clase que extiende la estrategia con local
  @Post("/login")
  login(@Request() req) {//en el body envia tu email y password(obviamente de tu database para probar), al pasar por el guard ejecutara automarticamente la funcion validate de nuestra clase que extienda el tipo de estrategia que aqui se ocupa en este caso local
    return this.authService.login(req.user)
  }



  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  profile() {
    return { message: "tudo bem" }
  }
}
