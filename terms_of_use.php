<?php

$check_terms = <<<HTML
	<div class="agree_wrap">
            <input class='check_agreement' style="height: 18px;" type="checkbox" id="agreement" />
            <label class='label_agreement'>Согласен на обработку персональных данных, принимаю условия 
            <a class='terms_page' href='/page/polzovatelskoesoglashenie' target="_blank">Пользовательского соглашения</a>
            </label>
  	</div>
  	
	<style type='text/css'>
		input.check_agreement {
			cursor: default;
		    width: 5%;
		    float: left;
		    display: inline-block;
		    margin-right: 10px;
		    height: 18px;
		    outline: none;
		}
		.label_agreement { 
			width: auto;
		    font-weight: lighter;
		    color: #999;
		    text-align: left;
		    font-size: 12px;
		}
		label.terms_page:hover {
			cursor: pointer;
			text-decoration: underline;
		}
		
		.agree_wrap{
			display: flex;
		    width: 100%;
            justify-content: center;
		}
		
		@media (max-width: 750px) {
			input.check_agreement {
				width: 10%;
			}
		}
	</style>
	<script>
	$(document).ready(function() {
		var wraper = $('.check_wrap_par');
    	var but = wraper.find('[data = "test_box"]');
    	
    	but.prop("disabled", true);
		      but.css({
		        'background-color': '#ccc',
		        'color': '#fff',
		        'cursor': 'default'
		      });
	
	    $(".check_agreement").click(function() 
	    {
		    if ($(this).prop("checked"))
		    {
		      but.prop("disabled", false);
		      but.attr('style','');
		    }
		    else 
		    {
		      but.prop("disabled", true);
		      but.css({
		        'background-color': '#ccc',
		        'color': '#fff',
		        'cursor': 'default'
		      });
		    }
		});
	});
	</script>
HTML;
?>