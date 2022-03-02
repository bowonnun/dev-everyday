/*
Author : Witoon Pomipon
Email : codebee2014@gmail.com
Website : codebee.co.th
Blogs : codebee.co.th/labs
Company : codebee company limited
*/
! function (n) {
	n.fn.AutoProvince = function (e) {
		var o = n.extend({
			PROVINCE: "#province",
			AMPHUR: "#amphur",
			DISTRICT: "#district",
			POSTCODE: "#postcode",
			GEOGRAPHY: "#geography",
			CURRENT_PROVINCE: null,
			CURRENT_AMPHUR: null,
			CURRENT_DISTRICT: null,
			arrangeByName: 1
		}, e);
		return this.each(function () {
			var e, t, i, a, r, R = "json/provinces.json",
				c = "json/amphures.json",
				u = "json/districts.json",
				T = "json/zipcodes.json",
				C = "json/geography.json";

			function d(e) {
				var i = [],
					a = !0;
				n(o.AMPHUR).empty(), n.grep(t, function (n) {
					return n.province_id == e
				}).forEach(function (n) {
					-1 == n.amphur_name.indexOf("*") && i.push({
						id: n.amphur_id,
						name: n.amphur_name,
						postcode: n.amphur_code,
						geo_id: n.geo_id
					})
				}), o.arrangeByName ? p(i.sort(_), o.AMPHUR) : p(i, o.AMPHUR);
				var r = n(o.AMPHUR).val();
				o.CURRENT_AMPHUR && n(o.AMPHUR).val(o.CURRENT_AMPHUR), null != o.CURRENT_DISTRICT ? s(o.CURRENT_AMPHUR) : a && (s(r), a = !1)
			}

			function s(e) {
				var t = [];
				n(o.DISTRICT).empty(), n.grep(i, function (n) {
					return n.amphur_id == e
				}).forEach(function (e) {
					t.push({
							id: e.district_id,
							name: e.district_name,
							geo_id: e.geo_id
						}),
						function (e) {
							var t = [];
							n(o.DISTRICT).empty(), n.grep(a, function (n) {
								return n.district_code == e
							}).forEach(function (e) {
								n(o.POSTCODE).val(e.zipcode_name)
							}), o.arrangeByName ? p(t.sort(_), o.DISTRICT) : p(t, o.DISTRICT)
						}(e.district_code)
				}), o.arrangeByName ? p(t.sort(_), o.DISTRICT) : p(t, o.DISTRICT), o.CURRENT_DISTRICT && n(o.DISTRICT).val(o.CURRENT_DISTRICT)
			}

			function p(e, t) {
				for (var i = 0; i < e.length; i++) t != o.AMPHUR ? 
					n(t).append("<option value='" + e[i].id + "' GEO='" + e[i].geo_id + "'>" + e[i].name + "</option>") : n(t).append("<option value='" + e[i].id + "' POSTCODE='" + e[i].postcode + "'>" + e[i].name + "</option>")
				
				
				
			}

			function _(n, e) {
				var o = n.name.toLowerCase(),
					t = e.name.toLowerCase();
				return o < t ? -1 : o > t ? 1 : 0
			}
			n(function () {
				n.when(n.getJSON(R), n.getJSON(c), n.getJSON(u), n.getJSON(T), n.getJSON(C)).done(function (R, c, u, T, C) {
					var E;
					e = R[0], t = c[0], i = u[0], a = T[0], r = C[0], E = [], e.forEach(function (n) {
						E.push({
							id: n.province_id,
							name: n.province_name,
							geo_id: n.geo_id
						}), n.geo_id
					}), o.arrangeByName ? p(E.sort(_), o.PROVINCE) : p(E, o.PROVINCE), o.CURRENT_PROVINCE && n(o.PROVINCE).val(o.CURRENT_PROVINCE), null != o.CURRENT_AMPHUR ? d(o.CURRENT_PROVINCE) : d(1), n(o.GEOGRAPHY).change(function (e) {
						var t = n(this).val(),
							i = n(this).find("option:selected").attr("GEO");
						o.CURRENT_AMPHUR = null, o.CURRENT_DISTRICT = null, d(t),
							function (e) {
								var t = n.grep(r, function (n) {
									return n.geo_id == e
								})[0].geo_name;
								// n(o.GEOGRAPHY).find("option:selected").val(e).text(t);
								$('#province option').remove();	
								for(var i = 0; i < E.sort(_).length; i++) {
								    if(e == E.sort(_)[i].geo_id){
								    	$('#province').append("<option value='" + E.sort(_)[i].id + "' GEO='" + E.sort(_)[i].geo_id + "'>" + E.sort(_)[i].name + "</option>")
								    }
								}
							}(i)

					}), n(o.AMPHUR).change(function (e) {
						var t = n(this).val();
						n(o.POSTCODE).val(n(this).find("option:selected").attr("POSTCODE")), s(t)
					})
				})
			})
			
		})
	}
}(jQuery);