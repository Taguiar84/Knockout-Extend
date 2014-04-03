$.mask.masks = $.extend($.mask.masks, {
    'date': { mask: '19/39/9999' }
    , 'datetime': { mask: '19/39/9999 29:59' }    
    , 'integer16': { mask: '9999', type: 'reverse', defaultValue: '+' }
    , 'integer': { mask: '999.999.999', type: 'reverse', defaultValue: '+' }
    , 'integer64': { mask: '999.999.999.999.999.999', type: 'reverse', defaultValue: '+' }
    , 'decimal' : { mask : '9999.999,999,999,9', type : 'reverse', defaultValue: '+' }  
    , 'currency': { mask: '99.999,999,999,999', type: 'reverse', defaultValue: '+' }
    , 'percent': { mask: '9999,999', type: 'reverse', defaultValue: '+' }
    , 'zipCode': { mask: '9999-999', type: 'reverse', defaultValue: '+' }
    , 'phone': { mask: '(99) 9999-9999', defaultValue: '' }
    , 'licenceTag': { mask: 'aaa-9999', defaultValue: '' }
});