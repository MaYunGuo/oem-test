/**
 * 输入字母时:自动转换为大写
 */
$(".upperCassCss").keyup(function(e) {
    $(this).val($(this).val().toUpperCase());
});
