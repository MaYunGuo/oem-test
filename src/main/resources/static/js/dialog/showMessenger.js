 $._messengerDefaults = {
		extraClasses : 'messenger-fixed messenger-theme-future messenger-on-bottom messenger-on-right'
	};
   function showMessengerSuccessDialog(msg,hideTime){
	   if(!hideTime){
		   hideTime = 5 ;
	   }
   		$.globalMessenger().post({
		   	message: msg ,
		   	type: 'info',
		   	showCloseButton: true,
		   	hideAfter: hideTime,
  			hideOnNavigate: true
	    })
   }
   function showMessengerErrorDialog(msg,hideTime){
   		$.globalMessenger().post({
		   	message: msg ,
		   	type: 'error',
		   	showCloseButton: true,
		   	hideAfter: hideTime,
  			hideOnNavigate: true
	    })
   }