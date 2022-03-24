<template>
  <div>
      <div class="container marketing mt-5">

        <!-- Three columns of text below the carousel -->
        <div class="row pt-5 ">
          <div class="col-lg-4">
            <div class="PopPhoto mb-4" style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1499530403357-0ea994f8655a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            
            <h2>Pc_Top - Aeschylus</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-top','pc-top-view-details-1')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1525272493553-dd8aa139b91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Pc_Top - Sophocles</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-top','pc-top-view-details-2')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Pc_Top - Euripides</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-top','pc-top-view-details-3')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->

                <!-- Three columns of text below the carousel -->
        <div class="row pt-5 ">
          <div class="col-lg-4">
            <div class="PopPhoto mb-4" style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1499530403357-0ea994f8655a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            
            <h2>Mobile - Aeschylus</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('mobile','mobile-view-details-1')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1525272493553-dd8aa139b91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Mobile - Sophocles</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('mobile','mobile-view-details-2')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Mobile - Euripides</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('mobile','mobile-view-details-3')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->

        <!-- Three columns of text below the carousel -->
        <div class="row pt-5 ">
          <div class="col-lg-4">
            <div class="PopPhoto mb-4" style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1499530403357-0ea994f8655a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            
            <h2>Pc_Bottom - Aeschylus</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-bottom','pc-bottom-view-details-1')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1525272493553-dd8aa139b91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Pc_Bottom - Sophocles</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-bottom','pc-bottom-view-details-2')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <div class="PopPhoto mb-4 " style="width:140px;height:140px;margin: 0 auto;">
              <img class="rounded-circle ImgGray" src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80" alt="Generic placeholder image" width="140" height="140">
            </div>
            <h2>Pc_Bottom - Euripides</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button" @click.prevent="viewDetails('pc-bottom','pc-bottom-view-details-3')">View details »</a></p>
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->


        <!-- START THE FEATURETTES -->

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5 PopPhoto" style="width:500px;height:500px;">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" style="width: 500px; height: 500px;" src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" data-holder-rendered="true">
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5 order-md-1 PopPhoto" style="width:500px;height:500px;">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" data-holder-rendered="true" style="width: 500px; height: 500px;">
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5 PopPhoto" style="width:500px;height:500px;">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" data-holder-rendered="true" style="width: 500px; height: 500px;">
          </div>
        </div>

        <hr class="featurette-divider">

        <!-- /END THE FEATURETTES -->

      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    viewDetails(item_area,item_info){
      gtag("event", "click_about_viewDetails", {
        item_area: item_area,
        item_info: item_info
      });
      alert('已記錄事件 '+item_area+' , '+item_info);
    }
  },
  created(){
    gtag('config', 'G-7XPWZBWZHT', {
      page_title: 'GA4-RESTAURANT - 關於我們',
      page_path: '/about'
    });
  }
};
</script>

<style scoped>
.PopPhoto{
    position: relative;
}
.PopPhoto Img {
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.ImgGray{
  -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
    transition: all .3s;
}

/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}


/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
  background-color: #777;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}


/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}


/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.05rem;
}


/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>
