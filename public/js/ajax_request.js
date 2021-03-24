$(document).ready(function(){
    // Load in table and create string to append
    var tableBody = $("table > tbody");
    var appendRow = "";
    $('form').on('submit', function(event){
        event.preventDefault();
        
        // Clear any previous table information
        tableBody.empty();
         $.ajax({
          type: 'POST',
          url: '/query',
          data: $("form").serialize(), 
          success: function(response) {
            // Since this AJAX returns an array, we can loop through it and append items to the page  
            $.each(response, function(index, item){
                
                // Append to table on successful data retrieve
                appendRow = "<tr><td>"+item.name+"</td><td>$"+item.price+"</td><td>"+item.quantity+"</td></tr>"
                tableBody.append(appendRow);
            });
          },
        });
    });

})
