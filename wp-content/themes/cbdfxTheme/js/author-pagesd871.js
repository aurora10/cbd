// eslint-disable-next-line no-undef
jQuery( document ).ready( function( $ ) {
	let page = 1;
	$( '.bear-content-button' ).on( 'click', '.see-more', function( ev ) {
		ev.preventDefault();
		const $thisButton = $( this ).find( 'a' );
		const saveText = $thisButton.text();
		$thisButton.text( '' );
		$thisButton.append( '<i class="fas fa-spin fa-spinner"></i>' );
		const author = $( '#authorId' ).val();
		// eslint-disable-next-line no-undef
		$.post( wp_ajax_object.ajaxurl, {
			action: 'load_more_author_blogposts',
			author,
			offset: page * 8,
		} ).done( function( data ) {
			// eslint-disable-next-line no-console
			page++;
			$( '.author-blogs .row' ).append( data );
			$thisButton.find( '.fa-spinner' ).remove();
			$thisButton.text( saveText );
		} );
	} );
} );
