/**
 * 解决在modal中select2无法搜索的问题
 */
$.fn.modal.Constructor.prototype.enforceFocus = function () { }; 