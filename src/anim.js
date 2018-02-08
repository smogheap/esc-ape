// ape test animation
function ape_test(ape, time) {
	var cos300 = Math.cos(time / 300);
	var cos150 = Math.cos(time / 150);
	var sin300 = Math.sin(time / 300);
	var sin150 = Math.sin(time / 150);

	if(sin300 < 0) {
		ape.removeTags("back");
		ape.addTags("front");
	} else {
		ape.removeTags("front");
		ape.addTags("back");
	}

	if(cos300 < 0) {
		ape.removeTags("ropen");
		ape.addTags("rclose");
		ape.removeTags("lclose");
		ape.addTags("lopen");
	} else {
		ape.removeTags("rclose");
		ape.addTags("ropen");
		ape.removeTags("lopen");
		ape.addTags("lclose");
	}

	ape.$["body-back"].offset.y = cos150 * 200 + 0;
	ape.$["body-front"].offset.y = cos150 * 200 + 0;
	ape.$["arm-l"].offset.y = cos150 * 200 - 130;
	ape.$["arm-r"].offset.y = cos150 * 200 - 130;
	
	ape.$["arm-r"].rotate = sin300 * 50 + 140;
	ape.$["arm-l"].rotate = sin300 * -50 - 10;

	ape.$["arm-r"].offset.x = sin300 * 100;
	ape.$["arm-l"].offset.x = sin300 * -80 + 10;

	ape.$["forearm-r"].rotate = sin300 * 30 + 10;
	ape.$["forearm-l"].rotate = sin300 * -30 - 20;

	ape.$["leg-r-back"].offset.x = sin300 * 70 + 120;
	ape.$["leg-r-front"].offset.x = sin300 * 50 + 120;
	ape.$["leg-r-back"].offset.y = cos150 * 10 + 350;
	ape.$["leg-r-front"].offset.y = cos150 * 10 + 350;
	ape.$["leg-r-back"].rotate = sin300 * 20 + 30;
	ape.$["leg-r-front"].rotate = sin300 * 20 - 30;
	

	ape.$["leg-l-back"].offset.x = sin300 * -70 + 160;
	ape.$["leg-l-front"].offset.x = sin300 * -50 + 140;
	ape.$["leg-l-back"].offset.y = cos150 * 5 + 350;
	ape.$["leg-l-front"].offset.y = cos150 * 5 + 350;
	ape.$["leg-l-back"].rotate = sin300 * 40 + 70;
	ape.$["leg-l-front"].rotate = sin300 * 40 + 70;

	
	/*
	ape.$.body._offset.x =  cos300 * 14;
	ape.$.body._offset.y = cos150;
	ape.$.body._rotate = 0;
	ape.$.snout._scale = 1;
	ape.$.snout._rotate = sin300 * -2;
	ape.$.mouth._scale = 1;
	ape.$.mouth._rotate = cos300 * 2;

	ape.$.leg1._offset.x = 0;
	ape.$.leg1._offset.y = 0;
	ape.$.leg2._offset.x = 0;
	ape.$.leg2._offset.y = 0;
	ape.$.leg1._rotate = cos300 * 5;
	ape.$.foot1._rotate = cos300 * -5;
	ape.$.leg2._rotate = cos300 * 5;
	ape.$.foot2._rotate = cos300 * -5;

	ape.$.hair1._rotate = sin300 * 3;
	ape.$.hair2._rotate = sin300 * 6;

	ape.$.pupil1._offset.x = 0;
	ape.$.pupil1._offset.y = 0;
	ape.$.pupil2._offset.x = 0;
	ape.$.pupil2._offset.y = 0;
	*/
}
