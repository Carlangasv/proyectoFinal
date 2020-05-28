<template>
  <div>
    <div class="p-3 mb-2 bg-danger text-white">
      <ul id="ul">
        <li id="li2" v-for="(permiso, index) in arregloPermisos" :key="index">
          <a :href="permiso.url">{{ permiso.nombre }}</a>
        </li>
      </ul>
    </div>

      <img src="../images/taller.jpg" />

  </div>
</template>
<script src="../assets/home.js" ></script>
<style>
#content-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#li2 {
  float: left;
}
#li2 a {
  display: block;
  color: black;
  text-align: left;
  margin-right: 30px;
  text-decoration: none;
}
</style>
