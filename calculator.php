<?
@session_start ();
@ob_start ();
@ob_implicit_flush ( 0 );
@error_reporting ( -1 );
@ini_set ( 'display_errors', true );
@ini_set ( 'html_errors', true );
@ini_set ( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

define ( 'RG_', true );
define ( 'ROOT_DIR', dirname ( __FILE__ ) );
define ( 'ENGINE_DIR', ROOT_DIR . '/engine' );
define ( 'BLOCKS_PATH' , ENGINE_DIR . '/modules/admin/small_blocks/' );
require_once ENGINE_DIR . '/init.php';

$config['http_home_url'] = explode ( "index.php", strtolower ( $_SERVER['PHP_SELF'] ) );
$config['http_home_url'] = reset ( $config['http_home_url'] );
$canonical = $_SERVER['HTTP_HOST'].$_SERVER['REDIRECT_URL'];

?>

    <head><script type="text/javascript" async="" charset="UTF-8">__jivoConfigOnLoad({"widget_id":"dnk25odSfa","site_id":307430,"widget_color":"#383345","widget_font_color":"light","widget_padding":"50","widget_height":"33","widget_orientation":"left","widget_mobile_orientation":"right","font_size":"14","font_family":"Arial","font_type":"normal","locale":"ru_RU","show_rate_form":1,"hide_ad":0,"secure":0,"contacts_ask":0,"style_string":"jivo_shadow jivo_rounded_corners jivo_gradient jivo_3d_effect jivo_border jivo_3px_border","chat_mode":1?"online":"offline","geoip":"RU;66;Saint Petersburg","botmode":false,"options":1016,"hide_offline":0,"build_number":"1517474380","avatar_url":"\/\/s3-eu-west-1.amazonaws.com\/jivo-userdata","online_widget_label":"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c, \u043c\u044b \u043e\u043d\u043b\u0430\u0439\u043d!","offline_widget_label":"\u041e\u0442\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u043d\u0430\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","offline_form_text":"\u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0432 \u044d\u0442\u043e\u0439 \u0444\u043e\u0440\u043c\u0435, \u043c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043c \u0435\u0433\u043e \u043d\u0430 e-mail \u0438 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0442\u0432\u0435\u0442\u0438\u043c!","callback_btn_color":"#44BB6E","base_url":"\/\/code.jivosite.com","static_host":"cdn.jivosite.com","comet":{"host":"node292.jivosite.com"},"rules":[{"name":"\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u0432 \u0434\u0438\u0430\u043b\u043e\u0433","enabled":true,"type":"all","conditions":[{"condition":"online","value":true},{"condition":"time_on_page","comparator":"greater","value":10},{"condition":"time_on_site","comparator":"greater","value":20},{"condition":"time_after_close","comparator":"greater","value":300},{"condition":"time_after_invitation","comparator":"greater","value":60}],"commands":[{"command":"proactive","params":{"message":"\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u042f \u043c\u043e\u0433\u0443 \u0432\u0430\u043c \u0447\u0435\u043c-\u0442\u043e \u043f\u043e\u043c\u043e\u0447\u044c?"}}]},{"name":"\u0421\u0431\u043e\u0440 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043e\u0432 \u0432 \u0440\u0435\u0436\u0438\u043c\u0435 \u043e\u0444\u0444\u043b\u0430\u0439\u043d","enabled":true,"type":"all","conditions":[{"condition":"online","value":false},{"condition":"time_on_page","comparator":"greater","value":10},{"condition":"time_on_site","comparator":"greater","value":20},{"condition":"time_after_close","comparator":"greater","value":300},{"condition":"time_after_invitation","comparator":"greater","value":60}],"commands":[{"command":"open_offline","params":{"title":"\u041e\u0442\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u043d\u0430\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","message":"\u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0432 \u044d\u0442\u043e\u0439 \u0444\u043e\u0440\u043c\u0435, \u043c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043c \u0435\u0433\u043e \u043d\u0430 e-mail \u0438 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0442\u0432\u0435\u0442\u0438\u043c!"}}]},{"name":"\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044e\u0449\u0430\u044f \u0444\u0440\u0430\u0437\u0430","enabled":true,"type":"all","conditions":[{"condition":"online","value":true},{"condition":"time_after_first_message","comparator":"greater","value":60}],"commands":[{"command":"system_message","params":{"message":"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435. \u0421\u0435\u0439\u0447\u0430\u0441 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u044b \u0437\u0430\u043d\u044f\u0442\u044b, \u043d\u043e \u0441\u043a\u043e\u0440\u043e \u043a\u0442\u043e-\u043d\u0438\u0431\u0443\u0434\u044c \u043e\u0441\u0432\u043e\u0431\u043e\u0434\u0438\u0442\u0441\u044f \u0438 \u043e\u0442\u0432\u0435\u0442\u0438\u0442 \u0432\u0430\u043c!"}}]}],"typing_insight":1,"contacts_settings":{"name":{"show":true,"required":false},"phone":{"show":true,"required":false},"email":{"show":true,"required":true}},"visitors_insight":1,"eula":true,"social_responce":1});</script><script type="text/javascript" async="" src="//code.jivosite.com/script/widget/dnk25odSfa"></script>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Юридические услуги в Санкт-Петербурге | Акома</title>
        <meta name="keywords" content="юридические услуги, юридические услуги юридическим лицам, юридические услуги санкт петербург, оказание юридических услуг">
        <meta name="description" content="Оказание спектра юридических услуг для физических и юридических лиц в СПб. Квалифицированная помощь, юридические консультации для компаний и организаций. Метро Старая Деревня">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="yandex-verification" content="d654da6b6439f355">
        <link rel="canonical" href="https://ooo-ip-spb.ru">
        <meta name="robots" content="all">
        <meta name="wmail-verification" content="c1606f27f9aa4c26">
        <link rel="shortcut icon" href="/favicon.ico">
        <!--<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="stylesheet" type="text/css" href="/templates/lib/bootstrap-3.3.7-dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/templates/lib/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="/templates/lib/fancybox/dist/jquery.fancybox.min.css" type="text/css" media="screen">

        <link rel="stylesheet" href="/templates/lib/OwlCarousel/dist/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="/templates/lib/OwlCarousel/dist/assets/owl.theme.default.min.css">

        <link rel="stylesheet" href="/templates/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="/templates/css/normalize.css">

        <link rel="stylesheet" href="/templates/css/styleLK.css">
        <link rel="stylesheet" type="text/css" href="/templates/css/style.css">
        <link rel="stylesheet" type="text/css" href="/templates/css/color.css">

        <link rel="stylesheet" type="text/css" href="/templates/css/gmodal.css">
        <link rel="stylesheet" type="text/css" href="/templates/css/search.css">
        <link rel="stylesheet" type="text/css" href="/templates/css/sorttable.css">

        <script async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://mc.yandex.ru/metrika/watch.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script src="/templates/lib/bootstrap-3.3.7-dist/js/jquery-3.1.1.min.js"></script>
        <script src="/templates/lib/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        <script src="/templates/lib/OwlCarousel/dist/owl.carousel.min.js"></script>
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
        <script src="https://api-maps.yandex.ru/2.0-stable/?load=package.standard&amp;lang=ru-RU"></script>
        <script src="//yastatic.net/share2/share.js"></script>

        <script src="/templates/js/plugins.js"></script>

        <script src="/templates/lib/jquery-ui-1.12.1/jquery-ui.min.js"></script>
        <script src="/templates/lib/fancybox/dist/jquery.fancybox.min.js"></script>

        <script src="/templates/js/admin.functions.js"></script>
        <script src="/templates/js/script.js"></script>

        <script src="/templates/js/gmodal.js"></script>
        <script src="/templates/js/search.js"></script>
        <script src="/templates/js/sorttable.js"></script>

        <!-- Редактор Tynimce -->
        <script src="/wysiwyg/tinymce/tinymce.min.js"></script>
        <script src="/wysiwyg/tinymce/param.js"></script>

        <!-- <script src='https://www.google.com/recaptcha/api.js'></script> -->
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-102175064-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-102175064-1');
        </script>
        <style type="text/css">.fancybox-margin{margin-right:0px;}</style>
    </head>
<?

require ENGINE_DIR . '/modules/header.php';
//{phone} = '+7 (812) 918-63-59';



//echo $main_menu;
echo $header_content;
 echo '
<script>
$(".phone1").html("+7 (812) 918-63-59");

</script>
 <section class="jumbotron advantage-content">
       <div class="container">
         <div class="row ">
            <h2 class="advantage-header"> Стоимость Регистрации ООО в СПб и Лен. области</h2>
              <div class="calc" style="text-align: center;">
                    <a data-type_package="doc-rs" class="btn btn-inverse actived">
						<span class="pakage-name">Документы + р/счёт</span>
                    </a>
                    <a data-type_package="razrab-doc-ooo" class="btn btn-inverse">
						<span class="pakage-name">Разработка и подача</span>
                    </a>
                    <a data-type_package="pod-kluch" class="btn btn-inverse">
						<span class="pakage-name">"Под ключ"</span>
                    </a>
              </div>
              <div class="table calc__list">
                 <div class="row with-round-btn row-grey">
                    <div class="cell">
                       Консультация юриста
                    </div>
                    <div class="cell">
					</div>

					<div class="cell price-cell">
						<p><span>Бесплатно</span></p>
					</div>

                </div>
                
                
                <div class="row with-round-btn row-normal">
                    <div class="cell">
                       Подготовка документов
                    </div>
                    <div class="cell">
					    <span class="btn-round js_serviceView active" data-idservice="podgotovka_dokumentov_ooo" data-price="1250"></span>
					</div>

					<div class="cell price-cell">
						<p><span>1 250 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                <div class="row with-round-btn row-grey">
                    <div class="cell">
                       Подача и получение документов МИФНС (Санкт-Петербург)
                    </div>
                    <div class="cell">
					    <span class="btn-round js_serviceView" data-idservice="mifns" data-price="1250"></span>
					</div>

					<div class="cell price-cell disables">
						<p><span>1 250 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                <div class="row with-round-btn row-normal">
                    <div class="cell">
                       Изготовление печатей
                    </div>
                    <div class="cell">
					    <span class="btn-round js_serviceView" data-idservice="pechat" data-price="1000"></span>
					</div>

					<div class="cell price-cell disables">
						<p><span>1 000 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                
                <div class="row with-round-btn row-grey">
                    <div class="cell">
                       Юридический адрес
                    </div>
                    <div class="cell">
                        <div class="float" id="float">
                            <span class="b-btn js_serviceView-s js_noselect active" id="ur_ad0" data-idservice="ur_ad" data-price="0">Нет</span>
                            <span class="b-btn with-hint  js_serviceView-s js_showPrice " id="ur_ad4200" data-idservice="ur_ad" data-price="4200">С почтовым обслуживанием</span>
					    </div>
					</div>

					<div class="cell price-cell">
						<p><span id = "cena_ur">0 </span><span class="rub">руб</span></p>
					</div>

                </div>
                
                
                 <div class="row with-round-btn row-normal">
                    <div class="cell">
                       Открытие расчётного счёта в банке
                    </div>
                    <div class="cell">
                         <span class="btn-round js_serviceView active" data-idservice="rs" data-price="3000"></span>
					</div>

					<div class="cell price-cell">
						<p><span>3 000 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                <div class="row with-round-btn row-grey">
                    <div class="cell">
                       Подача заявления на ЕНВД
                    </div>
                    <div class="cell">
                         <span class="btn-round js_serviceView" data-idservice="envd" data-price="900"></span>
					</div>

					<div class="cell price-cell disables">
						<p><span>900 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                
                <div class="row with-round-btn row-normal">
                    <div class="cell">
                       Получение выписки из ЕГРЮЛ
                    </div>
                    <div class="cell">
                         <span class="btn-round js_serviceView" data-idservice="egrul" data-price="950"></span>
					</div>

					<div class="cell price-cell disables">
						<p><span>950 <span class="rub">руб</span></span></p>
					</div>

                </div>
                
                
              </div>
              <div class="t__footer">
                <div class="dop_rasx">
                Обязательные расходы
                 <table>
                                      <tbody><tr>
                                              <td>Государственная пошлина </td>
                                              <td>&nbsp; <span>4000</span> <span class="rub">руб</span></td>
                                      </tr>
                                      <tr>
                                              <td>Нотариальные расходы</td>
                                              <td>&nbsp;&nbsp;<span>2420</span> <span class="rub">руб</span></td>
                                      </tr>                     
                              </tbody></table>                      
                </div>
                <div class="itogo">4250 <span class="rub">руб</span></div> 
              </div>
              <div class="zakaz_uslugi btn btn-inverse float">
                    <div class="order_btn order_but" name="submit" data-toggle="modal" data-target="#modal">Заказать услугу</div>
              </div>
         </div>
       </div>
 </section>
 
 
 
 ';


require ENGINE_DIR . '/modules/footer.php';
echo $footer_content;


include_once('terms_of_use.php');
?>