import { AppController } from "../controller/AppController";

export const UserRoutes = [

  {
    method: "post",
    route: "/userRegister",
    controller: AppController,
    action: "register",
  },
];
