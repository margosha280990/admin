<?php

if ($_SESSION['off'] == 'ok') {
  $cookie_block = '';
} else {
$cookie_block = '
<div class="content">
<div class="coockie_info">
<p class="coockie_text">Для функционирования сайта и обеспечения общей безопасности мы используем файлы «cookie», данные IP-адреса и местоположения. Нажимая кнопку или продолжая использовать сайт, вы разрешаете нам собирать информацию посредством файлов «cookie».</p>
<i class="fa close_cross fa-window-close-o" aria-hidden="true"></i>
</div>
</div>

<script>
$(document).ready(function() 
{
	$(".close_cross").click(function() {
		$.post("/engine/modules/ajax/cookieText.php",function() { 
				$(".coockie_info").fadeOut("slow");
			});
	});
});
</script>

<style>
	.close_cross{
	    position: absolute;
	    top: 15px;
	    right: 8%;
	    font-size: 18px;
	    cursor: pointer;
	}
	
	.coockie_info {
		display: inline-block;
		position: fixed;
		padding: 10px 30px 10px 50px;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #f3f3f3;
		opacity: 0.9;
		z-index: 10;
	}
	
	.coockie_text {
		display: inline-block;
		width: 90%;
		text-align: justify;
		font-size: 12px;
	}
	
	@media all and (max-width: 768px) {
		.coockie_info {
			max-width: 768px;
		}
		.coockie_text{
			line-height: 12px;
		}
	}
	
	@media all and (max-width: 425px) {
		.coockie_info {
			max-width: 425px;
		}
	}
	
	@media all and (max-width: 320px) {
		.coockie_info {
			max-width: 320px;
		}
	}
</style>
';
}

?>