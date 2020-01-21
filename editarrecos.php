<?php
include("includes/a_config.php");
require_once 'Model/Recomendacion.php';
$PAGE_TITLE = "FanBase - Editar Recomendaciones";
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <?php 
  include("includes/head-tag-contents.php"); 
      if ($_SESSION['usuario']->rango!='admin'){
        if ($_SESSION['usuario']->rango!='editor'){
          header('Location: ./index.php');
        }
      }
  ?>
</head>

<body>

  <?php include("includes/navbar.php"); 
  ?>

  <main class="container">

    <!--==========================
      Backend recomendaciones
    ============================-->
    <section class="wow fadeInUp recomendaciones">
      <div class="section-header">
        <h2>Editar recomendación</h2>
      </div>
      <div class="justify-content-center text-center">
        <?php
          $recomendacion=recomendacionObj::recuperarRecomendacion($_REQUEST['btneditar']);
        ?>
        Nombre: <input type="text" class="form-control" value="<?php echo $recomendacion->nombre;?>">
        Descripción: <textarea class="form-control"><?php echo $recomendacion->descripcion;?></textarea>
        Tipo:<select class="form-control"> 
        <option value="seriepeli">Serie/Película</option>
        <option value="juego">Juego</option>
        </select>
        Plataforma 1:<select name="plataforma1" class="form-control"> 
        <option value="">----</option>
        <option value="pc">PC</option>
        <option value="gog">GoG</option>
        <option value="steam">Steam</option>
        <option value="microsoft">Microsoft</option>
        <option value="google">Google Play Store</option>
        <option value="apple">App Store Apple</option>
        <option value="imdb">IMDB</option>
        </select>
        Plataforma 2:<select name="plataforma2" class="form-control"> 
        <option value="">----</option>
        <option value="pc">PC</option>
        <option value="gog">GoG</option>
        <option value="steam">Steam</option>
        <option value="microsoft">Microsoft</option>
        <option value="google">Google Play Store</option>
        <option value="apple">App Store Apple</option>
        <option value="imdb">IMDB</option>
        </select>
        Plataforma 3:<select name="plataforma3" class="form-control"> 
        <option value="">----</option>
        <option value="pc">PC</option>
        <option value="gog">GoG</option>
        <option value="steam">Steam</option>
        <option value="microsoft">Microsoft</option>
        <option value="google">Google Play Store</option>
        <option value="apple">App Store Apple</option>
        <option value="imdb">IMDB</option>
        </select>
        Plataforma 4:<select name="plataforma4" class="form-control"> 
        <option value="">----</option>
        <option value="pc">PC</option>
        <option value="gog">GoG</option>
        <option value="steam">Steam</option>
        <option value="microsoft">Microsoft</option>
        <option value="google">Google Play Store</option>
        <option value="apple">App Store Apple</option>
        <option value="imdb">IMDB</option>
        </select>
        Enlace plataforma 1: <input type="text" name="link1" class="form-control" value="<?php echo $recomendacion->linkplataforma1;?>">
        Enlace plataforma 2: <input type="text" name="link2" class="form-control" value="<?php echo $recomendacion->linkplataforma2;?>">
        Enlace plataforma 3: <input type="text" name="link3" class="form-control" value="<?php echo $recomendacion->linkplataforma3;?>">
        Enlace plataforma 4: <input type="text" name="link4" class="form-control" value="<?php echo $recomendacion->linkplataforma4;?>">
        <input type="submit" class="btn btn-success mb-4 mt-2 text-center" value="Guardar">

      </div>
     

    </section>

  </main>

  <?php include("includes/footer.php"); ?>
</body>

</html>