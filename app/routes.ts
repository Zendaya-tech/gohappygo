import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  //
  route("/annonces", "routes/annonces.tsx"),
  route("/announces/:id", "routes/announces.$id.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),
  route("/profile", "routes/profile.tsx"),
  route("/terms-privacy","routes/terms.tsx"),
  route("/logout","routes/logout.tsx"), // the logout route 
  route("/logos","routes/logos.tsx"), //route will show gohappygo logos
  route("/transporters","routes/transporters.tsx"), // this route will list all transporter 
  route("/forgot-password","routes/forgot-password.tsx"),
  route("/help-center","routes/help-center.tsx"),//the help centes with  all    reccurrent question 
  route("/security-rules","routes/security-rules.tsx"),
  route("/assurance-colis","routes/assurance-colis.tsx"),

  route("/how-it-work","routes/how-it-works.tsx"),


] satisfies RouteConfig;
