<template>
  <div align="center">
    <v-row no-gutters justify="center" align="center">
        <v-col cols="12" md="12" sm="6">
            <v-text-field
            label="Deskripsi"
            v-model="description"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="Pilih Gambar"
          accept="image/*"
          @change="selectImage"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" small @click="upload" :disabled="!currentImage">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <!-- <v-card v-if="imageInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(image, index) in imageInfos" :key="index">
            <a :href="image.url">{{ image.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card> -->

  </div>
</template>

<script>
import UploadService from "@/services/MyUploadFilesService";

export default {
  name: "upload-image",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      progress: 0,
      message: "",
      description: '',

      imageInfos: [],
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },

    upload() {
      if (!this.currentImage) {
        this.message = "Please select an Image!";
        return;
      }

      this.progress = 0;

      UploadService.uploadImage(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        // .then((response) => {
        //   this.message = response.data.message;
        //   return UploadService.getFiles();
        // })
        // .then((images) => {
        //   this.imageInfos = images.data;
        // })
        .then(response => {
            this.message = response.data.message
            /**
             * Mendapat response nama file
             */
            const messageToParent = {
                message: this.message,
                description: this.description,
            }
            this.$emit('successMessage', messageToParent)
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });
    },
  },
  mounted() {
    // UploadService.getFiles().then((response) => {
    //   this.imageInfos = response.data;
    // });
  },
};
</script>

<style scoped>
.preview {
  max-width: 200px;
}
</style>
