var juego = {
		filas: [[], [], []],
		espacioVacio: {fila: 2, columna:2},
		iniciar: function(juego) {			
			this.instalarPiezas(juego);			
		},
		instalarPiezas: function(juego) {
			var numero = 1;
			for (var fila=0 ; fila<3 ; fila++) {
				for (var columna=0 ; columna<3 ; columna++) {
					if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
						this.filas[fila][columna] = null; } else {
							var pieza = this.crearPieza(numero++,fila,columna);
							this.filas[fila][columna] = pieza;
							juego.append(pieza.elemento);
							}
				}
			}
			return juego;
		},
		crearPieza: function(numero, fila, columna) {
			var pieza = $("<div>");
			pieza.attr("class", "pieza");
			pieza.css({
				"background-image": "url(imagenes/" + numero + ".jpg)",
				"top": fila*200, 
				"left": columna*200
			});
			
			return {
				elemento : pieza,
				numero: numero,
				filaPieza: fila,
				colPieza: columna
			};
		},
		moverHaciaAbajo: function() {
			var filaOrigen = this.espacioVacio.fila-1;
			var columnaOrigen = this.espacioVacio.columna;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		},
		moverHaciaArriba: function() {
			var filaOrigen = this.espacioVacio.fila+1;
			var columnaOrigen = this.espacioVacio.columna;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		},
		moverHaciaLaDerecha: function() {
			var filaOrigen = this.espacioVacio.fila;
			var columnaOrigen = this.espacioVacio.columna-1;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		},
		moverHaciaLaIzquierda: function() {
			var filaOrigen = this.espacioVacio.fila;
			var columnaOrigen = this.espacioVacio.columna+1;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		},
		capturarTeclas: function() {
			var that = this;
			$("body").keydown( function(evento) {
				console.log(evento.which);
				switch(evento.which)
				{
					case 40: that.moverHaciaAbajo();
									break;
					case 38: that.moverHaciaArriba();
									break;
					case 39: that.moverHaciaLaDerecha();
									break;
					case 37: that.moverHaciaLaIzquierda();
									break;
				}
				evento.preventDefault();
				that.chequearSiGano();
			})
		},
		moverFichaFilaColumna: function(ficha, fila, columna) {
			ficha.elemento.animate({
				top: fila*200,
				left: columna*200
			}, 200)
		},
		guardarEspacioVacio: function(fila, columna) {
			this.espacioVacio.fila = fila;
			this.espacioVacio.columna = columna;
			this.filas[fila][columna] = null;
		},
		intercambiarPosicionConEspacioVacio: function (fila, columna) {
			var ficha = this.filas[fila] && this.filas[fila][columna];
			if(ficha) {
				this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
				this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
				this.guardarEspacioVacio(fila,columna);
			}

		},
		chequearSiGano: function () {
			for (var f=0; f<3; f++) {
				for (var c=0; c<3; c++) {
					var ficha = this.filas[f][c];
					if(ficha && !(ficha.filaPieza == f && ficha.colPieza == c)) {
						return false;
						}
					}
			}
			alert("¡Ganaste!");
		},
		mezclarFichas: function(veces) {
			if(veces<=0){
				return;
			}
			var that = this;
			var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
			var numeroRandom = Math.floor(Math.random() * 4);
			var nombreDeFuncion = funciones[numeroRandom];
			this[nombreDeFuncion]();
			setTimeout(function(){
				that.mezclarFichas(veces-1);
				},200);
			}
	};

$(document).ready(function(){
	var $juego = $("#juego");
	juego.iniciar($juego);
	juego.capturarTeclas();
	juego.mezclarFichas(20);
});