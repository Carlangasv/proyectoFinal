<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <br />
      <b-row cols="2">
        <b-col>
          <br />
          <b-card title="Crear mantenimientos">
            <b-card-text> A continuación inserte datos :</b-card-text>

            <b-form action="javascript:void(0)" @submit="crearMantenimiento()">
              <br />

              <b-form-group label="Mecanico" label-for="documento">
                <b-form-select
                  v-model="mantenimiento.id_mecanico"
                  :options="lista_empleados"
                  disabled
                  required
                  id="documento"
                ></b-form-select>
                <b-form-invalid-feedback :state="validacionId_mecanico"
                  >Campo obligatorio</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group label="Placa" label-for="placa">
                <b-form-select
                  v-model="mantenimiento.placa"
                  :options="lista_motos"
                  disabled
                  required
                  id="placa"
                ></b-form-select>
                <b-form-invalid-feedback :state="validacionPlaca"
                  >Campo obligatorio</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group label="Fecha" label-for="fecha">
                <b-form-input
                  class="form-control"
                  required
                  v-model="mantenimiento.fecha"
                  disabled
                  placeholder="dd-mm-aaaa"
                  id="fecha"
                />
                <b-form-invalid-feedback :state="validacionFecha"
                  >Campo obligatorio</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                label="Trabajos realizados"
                label-for="trabajos_realizados"
              >
                <b-form-input
                  class="form-control"
                  type="text"
                  required
                  :disabled="!enEdicion"
                  v-model="mantenimiento.trabajos_realizados"
                  placeholder="Ingrese los trabajos realizados"
                  id="trabajos_realizados"
                />
                <b-form-invalid-feedback :state="validacionTrabajos_realizados"
                  >Campo obligatorio</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                label="Horas invertidas"
                label-for="horas_invertidas"
              >
                <b-form-input
                  class="form-control"
                  type="number"
                  required
                  :disabled="!enEdicion"
                  v-model="mantenimiento.horas_invertidas"
                  placeholder="Ingrese las horas invertidas"
                  id="horas_invertidas"
                />
                <b-form-invalid-feedback :state="validacionHoras_invertidas"
                  >Campo obligatorio</b-form-invalid-feedback
                >
              </b-form-group>

              <b-button @click="actualizarMantenimientos()" variant="primary"
                >Actualizar mantenimiento</b-button
              >
            </b-form>
          </b-card>
        </b-col>
        <b-col>
          <br />
          <b-table
            striped
            responsive
            hover
            :items="lista_mantenimientos"
            v-show="showTable"
            class="border border-danger text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargarMantenimiento(row)"
                class="mr-2"
                variant="outline-primary"
              >
                <b-img left width="15" height="15"></b-img>Modificar
              </b-button>
              <br />
              <br />
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="../assets/maintenances.js" />
