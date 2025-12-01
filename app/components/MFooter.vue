<script setup lang="ts" ></script>


<template>
    <section class="footer" >
    <div class="footer-div" >
        <img src="/icons/Logo Footer.svg" alt="">
        <nav  >
            <ul class="footer-nav">
                <li>Maison</li>
                <li>Recette</li>
                <li>Contact</li>
                <li>A propos</li>
            </ul>
        </nav>
        <ul class="footer-nav" >
            <li><img src="/icons/ic_baseline-tiktok.svg" alt=""></li>
            <li><img src="/icons/Icon-facebook.svg" alt=""></li>
            <li><img src="/icons/Icon-insta.svg" alt=""></li>
            <li><img src="/icons/Icon-youtube.png" alt=""></li>
        </ul>

    </div>
    <p class="footer-text" >Copyright: © 2025 Chloé Vincent</p>
    </section>
</template>

<style lang="scss"  >
.footer{
    --footer-bg-color: var(--color-b);
    --footer-text: var(--color-text-w);
    background: var(--footer-bg-color);
    color: var(--footer-text);
    font-weight: semi-bold;
    font-family: Arial, Helvetica, sans-serif;

}
.footer-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  border: rem(3);
  border-radius: rem(20);
  padding: rem(12) rem(16);
}

.footer-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: rem(12);
  align-items: center;   
  font-size: rem(18);
}

.footer-text{
font-size: rem(12);
text-align: center;
padding: rem(8);
}
</style>