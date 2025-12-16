<template>
  <div>
    <AppHeader :isLogin="isLogin" @update:isLogin="isLogin = $event" />
    
    <div class="container">
      <main class="contacts-content">
        <h2>Contact Us</h2>
        <p class="subtitle">Get in touch with us for any questions or support</p>
        
        <div class="contact-info">
          <div class="contact-item">
            <div class="icon">📧</div>
            <h3>Email</h3>
            <p>support@postit.com</p>
            <p>info@postit.com</p>
          </div>
          
          <div class="contact-item">
            <div class="icon">📞</div>
            <h3>Phone</h3>
            <p>+372 123 4567</p>
            <p>+372 987 6543</p>
          </div>
          
          <div class="contact-item">
            <div class="icon">📍</div>
            <h3>Address</h3>
            <p>PostIt Headquarters</p>
            <p>Narva mnt 25</p>
            <p>10120 Tartu, Estonia</p>
          </div>
          
          <div class="contact-item">
            <div class="icon">🕐</div>
            <h3>Office Hours</h3>
            <p>Monday - Friday</p>
            <p>9:00 AM - 5:00 PM (EET)</p>
            <p class="closed">Weekend: Closed</p>
          </div>
        </div>

        <div class="social-media">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>
      </main>
    </div>
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'ContactsView',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isLogin: !!localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
}

.contacts-content {
  width: 90%;
  max-width: 1000px;
}

.contacts-content h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.1em;
  color: #666;
  margin-bottom: 40px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.contact-item {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.contact-item h3 {
  font-size: 1.3em;
  margin-bottom: 15px;
  color: #333;
}

.contact-item p {
  margin: 8px 0;
  color: #555;
  font-size: 1em;
  line-height: 1.6;
}

.closed {
  color: #999;
  font-style: italic;
}

.social-media {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 15px;
}

.social-media h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.social-link {
  display: inline-block;
  padding: 12px 30px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: 500;
}

.social-link:hover {
  background-color: #555;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .contacts-content h2 {
    font-size: 2em;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .social-link {
    width: 200px;
  }
}
</style>