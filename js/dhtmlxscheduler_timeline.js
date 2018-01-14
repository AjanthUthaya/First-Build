/*
@license
dhtmlxScheduler v.4.4.9 Professional

This software can be used only as part of dhtmlx.com site.
You are not allowed to use it on any other site

(c) Dinamenta, UAB.


*/
Scheduler.plugin(function(e) {
  e._temp_matrix_scope = function() {
    e.matrix = {}, e._merge = function(e, t) {
      for (var a in t) "undefined" == typeof e[a] && (e[a] = t[a])
    }, e.createTimelineView = function(t) {
      e._skin_init(), e._merge(t, {
        section_autoheight: !0,
        name: "matrix",
        x: "time",
        y: "time",
        x_step: 1,
        x_unit: "hour",
        y_unit: "day",
        y_step: 1,
        x_start: 0,
        x_size: 24,
        y_start: 0,
        y_size: 7,
        render: "cell",
        dx: 200,
        dy: 50,
        event_dy: e.xy.bar_height - 5,
        event_min_dy: e.xy.bar_height - 5,
        resize_events: !0,
        fit_events: !0,
        show_unassigned: !1,
        second_scale: !1,
        round_position: !1,
        _logic: function(t, a, i) {
          var n = {};
          return e.checkEvent("onBeforeSectionRender") && (n = e.callEvent("onBeforeSectionRender", [t, a, i])), n
        }
      }), t._original_x_start = t.x_start, "day" != t.x_unit && (t.first_hour = t.last_hour = 0), t._start_correction = t.first_hour ? 60 * t.first_hour * 60 * 1e3 : 0, t._end_correction = t.last_hour ? 60 * (24 - t.last_hour) * 60 * 1e3 : 0, e.checkEvent("onTimelineCreated") && e.callEvent("onTimelineCreated", [t]);
      var a = e.render_data;
      e.render_data = function(i, n) {
          if (this._mode != t.name) return a.apply(this, arguments);
          if (n && !t.show_unassigned && "cell" != t.render)
            for (var r = 0; r < i.length; r++) this.clear_event(i[r]),
              this.render_timeline_event.call(this.matrix[this._mode], i[r], !0);
          else e._renderMatrix.call(t, !0, !0)
        }, e.matrix[t.name] = t, e.templates[t.name + "_cell_value"] = function(e) {
          return e ? e.length : ""
        }, e.templates[t.name + "_cell_class"] = function(e) {
          return ""
        }, e.templates[t.name + "_scalex_class"] = function(e) {
          return ""
        }, e.templates[t.name + "_second_scalex_class"] = function(e) {
          return ""
        }, e.templates[t.name + "_scaley_class"] = function(e, t, a) {
          return ""
        }, e.templates[t.name + "_scale_label"] = function(e, t, a) {
          return t
        }, e.templates[t.name + "_tooltip"] = function(e, t, a) {
          return a.text
        }, e.templates[t.name + "_date"] = function(t, a) {
          return t.getDay() == a.getDay() && 864e5 > a - t || +t == +e.date.date_part(new Date(a)) || +e.date.add(t, 1, "day") == +a && 0 === a.getHours() && 0 === a.getMinutes() ? e.templates.day_date(t) : t.getDay() != a.getDay() && 864e5 > a - t ? e.templates.day_date(t) + " &ndash; " + e.templates.day_date(a) : e.templates.week_date(t, a)
        }, e.templates[t.name + "_scale_date"] = e.date.date_to_str(t.x_date || e.config.hour_date), e.templates[t.name + "_second_scale_date"] = e.date.date_to_str(t.second_scale && t.second_scale.x_date ? t.second_scale.x_date : e.config.hour_date),
        e.date["add_" + t.name + "_private"] = function(a, i) {
          var n = i,
            r = t.x_unit;
          if ("minute" == t.x_unit || "hour" == t.x_unit) {
            var s = n;
            "hour" == t.x_unit && (s *= 60), s % 1440 || (n = s / 1440, r = "day")
          }
          return e.date.add(a, n, r)
        }, e.date["add_" + t.name] = function(a, i, n) {
          var r = e.date["add_" + t.name + "_private"](a, (t.x_length || t.x_size) * t.x_step * i);
          if ("minute" == t.x_unit || "hour" == t.x_unit) {
            var s = t.x_length || t.x_size,
              d = "hour" == t.x_unit ? 60 * t.x_step : t.x_step;
            if (d * s % 1440)
              if (+e.date.date_part(new Date(a)) == +e.date.date_part(new Date(r))) t.x_start += i * s;
              else {
                var o = 1440 / (s * d) - 1,
                  _ = Math.round(o * s);
                i > 0 ? t.x_start = t.x_start - _ : t.x_start = _ + t.x_start
              }
          }
          return r
        }, e.date[t.name + "_start"] = function(a) {
          var i = e.date[t.x_unit + "_start"] || e.date.day_start,
            n = i.call(e.date, a),
            r = n.getTimezoneOffset();
          n = e.date.add(n, t.x_step * t.x_start, t.x_unit);
          var s = n.getTimezoneOffset();
          return r != s && n.setTime(n.getTime() + 6e4 * (s - r)), n
        }, e.callEvent("onOptionsLoad", [t]), e[t.name + "_view"] = function(a) {
          a ? e._set_timeline_dates(t) : e._renderMatrix.apply(t, arguments)
        };
      var i = new Date;
      e.date.add(i, t.x_step, t.x_unit).valueOf() - i.valueOf();
      e["mouse_" + t.name] = function(a) {
        var i = this._drag_event;
        this._drag_id && (i = this.getEvent(this._drag_id)), a.x -= t.dx;
        var n = e._timeline_drag_date(t, a.x);
        if (a.x = 0, a.force_redraw = !0, a.custom = !0, "move" == this._drag_mode && this._drag_id && this._drag_event) {
          var i = this.getEvent(this._drag_id),
            r = this._drag_event;
          if (a._ignores = this._ignores_detected || t._start_correction || t._end_correction, void 0 === r._move_delta && (r._move_delta = (i.start_date - n) / 6e4, this.config.preserve_length && a._ignores && (r._move_delta = this._get_real_event_length(i.start_date, n, t),
              r._event_length = this._get_real_event_length(i.start_date, i.end_date, t))), this.config.preserve_length && a._ignores) {
            var s = (r._event_length, this._get_fictional_event_length(n, r._move_delta, t, !0));
            n = new Date(n - s)
          } else n = e.date.add(n, r._move_delta, "minute")
        }
        if ("resize" == this._drag_mode && i && (this.config.timeline_swap_resize && this._drag_id && (this._drag_from_start && +n > +i.end_date ? this._drag_from_start = !1 : !this._drag_from_start && +n < +i.start_date && (this._drag_from_start = !0)), a.resize_from_start = this._drag_from_start, !this.config.timeline_swap_resize && this._drag_id && this._drag_from_start && +n >= +e.date.add(i.end_date, -e.config.time_step, "minute") && (n = e.date.add(i.end_date, -e.config.time_step, "minute"))), t.round_position) switch (this._drag_mode) {
          case "move":
            this.config.preserve_length || (n = e._timeline_get_rounded_date.call(t, n, !1), "day" == t.x_unit && (a.custom = !1));
            break;
          case "resize":
            this._drag_event && ((null === this._drag_event._resize_from_start || void 0 === this._drag_event._resize_from_start) && (this._drag_event._resize_from_start = a.resize_from_start),
              a.resize_from_start = this._drag_event._resize_from_start, n = e._timeline_get_rounded_date.call(t, n, !this._drag_event._resize_from_start))
        }
        this._resolve_timeline_section(t, a), a.section && this._update_timeline_section({
          pos: a,
          event: this.getEvent(this._drag_id),
          view: t
        }), a.y = Math.round((this._correct_shift(n, 1) - this._min_date) / (6e4 * this.config.time_step)), a.shift = this.config.time_step, t.round_position && "new-size" == this._drag_mode && n <= this._drag_start && (a.shift = e.date.add(this._drag_start, t.x_step, t.x_unit) - this._drag_start);
        var d = this._is_pos_changed(this._drag_pos, a);
        return this._drag_pos && d && (this._drag_event._dhx_changed = !0), d || this._drag_pos.has_moved || (a.force_redraw = !1), a
      }
    }, e._prepare_timeline_events = function(t) {
      var a = [];
      if ("cell" == t.render) a = e._timeline_trace_events.call(t);
      else
        for (var i = e.get_visible_events(), n = t.order, r = 0; r < i.length; r++) {
          var s = i[r],
            d = s[t.y_property],
            o = t.order[d];
          if (t.show_unassigned && !d) {
            for (var _ in n)
              if (n.hasOwnProperty(_)) {
                o = n[_], a[o] || (a[o] = []);
                var l = e._lame_copy({}, s);
                l[t.y_property] = _,
                  a[o].push(l)
              }
          } else a[o] || (a[o] = []), a[o].push(s)
        }
      return a
    }, e._populate_timeline_rendered = function(t) {
      e._rendered = [];
      for (var a = t.getElementsByTagName("DIV"), i = 0; i < a.length; i++) a[i].getAttribute("event_id") && e._rendered.push(a[i])
    }, e._get_timeline_event_height = function(e, t) {
      var a = e[t.y_property],
        i = t.event_dy;
      return "full" == t.event_dy && (i = t.section_autoheight ? t._section_height[a] - 6 : t.dy - 3), t.resize_events && (i = Math.max(Math.floor(i / e._count), t.event_min_dy)), i
    }, e._get_timeline_event_y = function(t, a) {
      var i = t,
        n = 2 + i * a + (i ? 2 * i : 0);
      return e.config.cascade_event_display && (n = 2 + i * e.config.cascade_event_margin + (i ? 2 * i : 0)), n
    }, e.render_timeline_event = function(t, a) {
      var i = t[this.y_property];
      if (!i) return "";
      var n = t._sorder,
        r = e._timeline_getX(t, !1, this),
        s = e._timeline_getX(t, !0, this),
        d = e._get_timeline_event_height(t, this),
        o = d - 2;
      t._inner || "full" != this.event_dy || (o = (o + 2) * (t._count - n) - 2);
      var _ = e._get_timeline_event_y(t._sorder, d),
        l = d + _ + 2;
      (!this._events_height[i] || this._events_height[i] < l) && (this._events_height[i] = l);
      var c = e.templates.event_class(t.start_date, t.end_date, t);
      c = "dhx_cal_event_line " + (c || ""), t._no_drag_move && (c += " no_drag_move");
      var h = t.color ? "background:" + t.color + ";" : "",
        u = t.textColor ? "color:" + t.textColor + ";" : "",
        v = e.templates.event_bar_text(t.start_date, t.end_date, t),
        f = "<div " + e._waiAria.eventBarAttrString(t) + " event_id='" + t.id + "' class='" + c + "' style='" + h + u + "position:absolute; top:" + _ + "px; height: " + o + "px; left:" + (r - 2) + "px; width:" + Math.max(0, s - r) + "px;" + (t._text_style || "") + "'>";
      if (e.config.drag_resize && !e.config.readonly) {
        var g = "dhx_event_resize",
          p = "<div class='" + g + " " + g + "_start' style='height: " + o + "px;'></div>",
          m = "<div class='" + g + " " + g + "_end' style='height: " + o + "px;'></div>";
        f += (t._no_resize_start ? "" : p) + (t._no_resize_end ? "" : m)
      }
      if (f += v + "</div>", !a) return f;
      var y = document.createElement("DIV");
      y.innerHTML = f;
      var x = this.order[i],
        b = e._els.dhx_cal_data[0].firstChild.rows[x];
      if (b) {
        var w = b.cells[1].firstChild;
        e._rendered.push(y.firstChild), w.appendChild(y.firstChild)
      }
    }, e._timeline_trace_events = function() {
      for (var t = e.get_visible_events(), a = [], i = 0; i < this.y_unit.length; i++) a[i] = [];
      var n;
      a[n] || (a[n] = []);
      for (var i = 0; i < t.length; i++) {
        n = this.order[t[i][this.y_property]];
        for (var r = 0; this._trace_x[r + 1] && t[i].start_date >= this._trace_x[r + 1];) r++;
        for (; this._trace_x[r] && t[i].end_date > this._trace_x[r];) a[n][r] || (a[n][r] = []), a[n][r].push(t[i]), r++
      }
      return a
    }, e._timeline_getX = function(t, a, i) {
      var n = 0,
        r = i._step,
        s = i.round_position,
        d = 0,
        o = a ? t.end_date : t.start_date;
      o.valueOf() > e._max_date.valueOf() && (o = e._max_date);
      var _ = o - e._min_date_timeline;
      if (_ > 0) {
        var l = e._get_date_index(i, o);
        e._ignores[l] && (s = !0);
        for (var c = 0; l > c; c++) n += e._cols[c];
        var h = e._timeline_get_rounded_date.apply(i, [o, !1]);
        s ? +o > +h && a && (d = e._cols[l]) : (_ = o - h, i.first_hour || i.last_hour ? (_ -= i._start_correction,
          0 > _ && (_ = 0), d = Math.round(_ / r), d > e._cols[l] && (d = e._cols[l])) : d = Math.round(_ / r))
      }
      return n += a ? 0 === _ || s ? d - 14 : d - 12 : d + 1
    }, e._timeline_get_rounded_date = function(t, a) {
      var i = e._get_date_index(this, t),
        n = this._trace_x[i];
      return a && +t != +this._trace_x[i] && (n = this._trace_x[i + 1] ? this._trace_x[i + 1] : e.date.add(this._trace_x[i], this.x_step, this.x_unit)), new Date(n)
    }, e._timeline_skip_ignored = function(t) {
      if (e._ignores_detected)
        for (var a, i, n, r, s = 0; s < t.length; s++) {
          for (r = t[s], n = !1, a = e._get_date_index(this, r.start_date), i = e._get_date_index(this, r.end_date); i > a;) {
            if (!e._ignores[a]) {
              n = !0;
              break
            }
            a++
          }
          n || a != i || e._ignores[i] || +r.end_date > +this._trace_x[i] && (n = !0), n || (t.splice(s, 1), s--)
        }
    }, e._timeline_get_events_html = function(t) {
      var a = "";
      if (t && "cell" != this.render) {
        e._timeline_skip_ignored.call(this, t), t.sort(this.sort || function(e, t) {
          return e.start_date.valueOf() == t.start_date.valueOf() ? e.id > t.id ? 1 : -1 : e.start_date > t.start_date ? 1 : -1
        });
        for (var i = [], n = t.length, r = 0; n > r; r++) {
          var s = t[r];
          s._inner = !1;
          var d = this.round_position ? e._timeline_get_rounded_date.apply(this, [s.start_date, !1]) : s.start_date;
          for (this.round_position ? e._timeline_get_rounded_date.apply(this, [s.end_date, !0]) : s.end_date; i.length;) {
            var o = i[i.length - 1];
            if (!(o.end_date.valueOf() <= d.valueOf())) break;
            i.splice(i.length - 1, 1)
          }
          for (var _ = !1, l = 0; l < i.length; l++) {
            var c = i[l];
            if (c.end_date.valueOf() <= d.valueOf()) {
              _ = !0, s._sorder = c._sorder, i.splice(l, 1), s._inner = !0;
              break
            }
          }
          if (i.length && (i[i.length - 1]._inner = !0), !_)
            if (i.length)
              if (i.length <= i[i.length - 1]._sorder) {
                if (i[i.length - 1]._sorder)
                  for (var h = 0; h < i.length; h++) {
                    for (var u = !1, v = 0; v < i.length; v++)
                      if (i[v]._sorder == h) {
                        u = !0;
                        break
                      }
                    if (!u) {
                      s._sorder = h;
                      break
                    }
                  } else s._sorder = 0;
                s._inner = !0
              } else {
                for (var f = i[0]._sorder, g = 1; g < i.length; g++) i[g]._sorder > f && (f = i[g]._sorder);
                s._sorder = f + 1, s._inner = !1
              }
          else s._sorder = 0;
          i.push(s), i.length > (i.max_count || 0) ? (i.max_count = i.length, s._count = i.length) : s._count = s._count ? s._count : 1
        }
        for (var p = 0; p < t.length; p++) t[p]._count = i.max_count;
        for (var m = 0; n > m; m++) a += e.render_timeline_event.call(this, t[m], !1)
      }
      return a
    }, e._timeline_y_scale = function(t) {
      var a = "<table style='table-layout:fixed;' cellspacing='0' cellpadding='0'>";
      e._load_mode && e._load();
      for (var i = e._prepare_timeline_events(this), n = 0, r = 0; r < e._cols.length; r++) n += e._cols[r];
      var s = new Date,
        d = e._cols.length - e._ignores_detected;
      s = (e.date.add(s, this.x_step * d, this.x_unit) - s - (this._start_correction + this._end_correction) * d) / n, this._step = s, this._summ = n;
      var o = e._colsS.heights = [],
        _ = [];
      this._events_height = {}, this._section_height = {};
      for (var r = 0; r < this.y_unit.length; r++) {
        var l = this._logic(this.render, this.y_unit[r], this);
        e._merge(l, {
          height: this.dy
        }), this.section_autoheight && (this.y_unit.length * l.height < t.offsetHeight && (l.height = Math.max(l.height, Math.floor((t.offsetHeight - 1) / this.y_unit.length))),
          this._section_height[this.y_unit[r].key] = l.height), l.td_className || (l.td_className = "dhx_matrix_scell" + (e.templates[this.name + "_scaley_class"](this.y_unit[r].key, this.y_unit[r].label, this.y_unit[r]) ? " " + e.templates[this.name + "_scaley_class"](this.y_unit[r].key, this.y_unit[r].label, this.y_unit[r]) : "")), l.td_content || (l.td_content = e.templates[this.name + "_scale_label"](this.y_unit[r].key, this.y_unit[r].label, this.y_unit[r])), e._merge(l, {
          tr_className: "",
          style_height: "height:" + l.height + "px;",
          style_width: "width:" + this.dx + "px;",
          summ_width: "width:" + n + "px;",
          table_className: ""
        });
        var c = e._timeline_get_events_html.call(this, i[r]);
        if (this.fit_events) {
          var h = this._events_height[this.y_unit[r].key] || 0;
          l.height = h > l.height ? h : l.height, l.style_height = "height:" + l.height + "px;", this._section_height[this.y_unit[r].key] = l.height
        }
        if (a += "<tr class='" + l.tr_className + "' style='" + l.style_height + "'><td class='" + l.td_className + "' style='" + l.style_width + " height:" + (l.height - 1) + "px;' " + e._waiAria.label(l.td_content) + ">" + l.td_content + "</td>", "cell" == this.render)
          for (var u = 0; u < e._cols.length; u++) a += e._ignores[u] ? "<td></td>" : "<td class='dhx_matrix_cell " + e.templates[this.name + "_cell_class"](i[r][u], this._trace_x[u], this.y_unit[r]) + "' style='width:" + e._cols[u] + "px'><div style='width:auto'>" + e.templates[this.name + "_cell_value"](i[r][u], this._trace_x[u], this.y_unit[r]) + "</div></td>";
        else {
          a += "<td><div style='" + l.summ_width + " " + l.style_height + " position:relative;' class='dhx_matrix_line'>", a += c, a += "<table class='" + l.table_className + "' cellpadding='0' cellspacing='0' style='" + l.summ_width + " " + l.style_height + "' >";
          for (var u = 0; u < e._cols.length; u++) a += e._ignores[u] ? "<td></td>" : "<td class='dhx_matrix_cell " + e.templates[this.name + "_cell_class"](i[r], this._trace_x[u], this.y_unit[r]) + "' style='width:" + e._cols[u] + "px'></td>";
          a += "</table>", a += "</div></td>"
        }
        a += "</tr>", _.push(l)
      }
      a += "</table>",
        this._matrix = i, t.innerHTML = a, e._populate_timeline_rendered(t), this._scales = {};
      for (var v = t.firstChild.rows, f = null, r = 0, g = _.length; g > r; r++) {
        f = this.y_unit[r], o.push(_[r].height);
        var p = f.key,
          m = this._scales[p] = e._isRender("cell") ? v[r] : v[r].childNodes[1].getElementsByTagName("div")[0];
        e.callEvent("onScaleAdd", [m, p])
      }
    }, e._timeline_x_dates = function(t) {
      var a = e._min_date,
        i = e._max_date;
      e._process_ignores(a, this.x_size, this.x_unit, this.x_step, t);
      for (var n = (this.x_size + (t ? e._ignores_detected : 0), 0), r = 0; + i > +a;)
        if (this._trace_x[r] = new Date(a),
          "month" == this.x_unit && e.date[this.x_unit + "_start"] && (a = e.date[this.x_unit + "_start"](new Date(a))), a = e.date.add(a, this.x_step, this.x_unit), e.date[this.x_unit + "_start"] && (a = e.date[this.x_unit + "_start"](a)), e._ignores[r] || n++, r++, t)
          if (n < this.x_size && !(+i > +a)) i = e.date["add_" + this.name + "_private"](i, (this.x_length || this.x_size) * this.x_step);
          else if (n >= this.x_size) {
        e._max_date = a;
        break
      }
      return {
        total: r,
        displayed: n
      }
    }, e._timeline_x_scale = function(t) {
      var a = e.xy.scale_height,
        i = this._header_resized || e.xy.scale_height;
      e._cols = [], e._colsS = {
        height: 0
      }, this._trace_x = [];
      var n = e._x - this.dx - e.xy.scroll_width,
        r = [this.dx],
        s = e._els.dhx_cal_header[0];
      s.style.width = r[0] + n + "px";
      for (var d = e._min_date_timeline = e._min_date, o = e.config.preserve_scale_length, _ = e._timeline_x_dates.call(this, o), l = _.displayed, c = _.total, h = 0; c > h; h++) e._ignores[h] ? (e._cols[h] = 0, l++) : e._cols[h] = Math.floor(n / (l - h)), n -= e._cols[h], r[h + 1] = r[h] + e._cols[h];
      if (t.innerHTML = "<div></div>", this.second_scale) {
        for (var u = this.second_scale.x_unit, v = [this._trace_x[0]], f = [], g = [this.dx, this.dx], p = 0, m = 0; m < this._trace_x.length; m++) {
          var y = this._trace_x[m],
            x = e._timeline_is_new_interval(u, y, v[p]);
          x && (++p, v[p] = y, g[p + 1] = g[p]);
          var b = p + 1;
          f[p] = e._cols[m] + (f[p] || 0), g[b] += e._cols[m]
        }
        t.innerHTML = "<div></div><div></div>";
        var w = t.firstChild;
        w.style.height = i + "px";
        var k = t.lastChild;
        k.style.position = "relative";
        for (var E = 0; E < v.length; E++) {
          var D = v[E],
            N = e.templates[this.name + "_second_scalex_class"](D),
            S = document.createElement("DIV");
          S.className = "dhx_scale_bar dhx_second_scale_bar" + (N ? " " + N : ""), e.set_xy(S, f[E] - 1, i - 3, g[E], 0), S.innerHTML = e.templates[this.name + "_second_scale_date"](D),
            w.appendChild(S)
        }
      }
      e.xy.scale_height = i, t = t.lastChild;
      for (var C = 0; C < this._trace_x.length; C++)
        if (!e._ignores[C]) {
          d = this._trace_x[C], e._render_x_header(C, r[C], d, t);
          var M = e.templates[this.name + "_scalex_class"](d);
          M && (t.lastChild.className += " " + M)
        }
      e.xy.scale_height = a;
      var A = this._trace_x;
      t.onclick = function(t) {
        var a = e._timeline_locate_hcell(t);
        a && e.callEvent("onXScaleClick", [a.x, A[a.x], t || event])
      }, t.ondblclick = function(t) {
        var a = e._timeline_locate_hcell(t);
        a && e.callEvent("onXScaleDblClick", [a.x, A[a.x], t || event]);
      }
    }, e._timeline_is_new_interval = function(t, a, i) {
      switch (t) {
        case "hour":
          return a.getHours() != i.getHours() || e._timeline_is_new_interval("day", a, i);
        case "day":
          return !(a.getDate() == i.getDate() && a.getMonth() == i.getMonth() && a.getFullYear() == i.getFullYear());
        case "week":
          return !(e.date.week_start(new Date(a)).valueOf() == e.date.week_start(new Date(i)).valueOf());
        case "month":
          return !(a.getMonth() == i.getMonth() && a.getFullYear() == i.getFullYear());
        case "year":
          return !(a.getFullYear() == i.getFullYear());
        default:
          return !1;
      }
    }, e._timeline_reset_scale_height = function(t) {
      if (this._header_resized && (!t || !this.second_scale)) {
        e.xy.scale_height /= 2, this._header_resized = !1;
        var a = e._els.dhx_cal_header[0];
        a.className = a.className.replace(/ dhx_second_cal_header/gi, "")
      }
    }, e._timeline_set_full_view = function(t) {
      if (e._timeline_reset_scale_height.call(this, t), t) {
        this.second_scale && !this._header_resized && (this._header_resized = e.xy.scale_height, e.xy.scale_height *= 2, e._els.dhx_cal_header[0].className += " dhx_second_cal_header"), e.set_sizes(),
          e._init_matrix_tooltip();
        var a = e._min_date;
        e._timeline_x_scale.call(this, e._els.dhx_cal_header[0]), e._timeline_y_scale.call(this, e._els.dhx_cal_data[0]), e._min_date = a, e._els.dhx_cal_date[0].innerHTML = e.templates[this.name + "_date"](e._min_date, e._max_date), e._mark_now && e._mark_now(), e._timeline_reset_scale_height.call(this, t)
      }
      e._timeline_hideToolTip()
    }, e._timeline_hideToolTip = function() {
      e._tooltip && (e._tooltip.style.display = "none", e._tooltip.date = "")
    }, e._timeline_showToolTip = function(t, a, i) {
      if ("cell" == t.render) {
        var n = a.x + "_" + a.y,
          r = t._matrix[a.y][a.x];
        if (!r) return e._timeline_hideToolTip();
        if (r.sort(function(e, t) {
            return e.start_date > t.start_date ? 1 : -1
          }), e._tooltip) {
          if (e._tooltip.date == n) return;
          e._tooltip.innerHTML = ""
        } else {
          var s = e._tooltip = document.createElement("DIV");
          s.className = "dhx_year_tooltip", document.body.appendChild(s), s.onclick = e._click.dhx_cal_data
        }
        for (var d = "", o = 0; o < r.length; o++) {
          var _ = r[o].color ? "background-color:" + r[o].color + ";" : "",
            l = r[o].textColor ? "color:" + r[o].textColor + ";" : "";
          d += "<div class='dhx_tooltip_line' event_id='" + r[o].id + "' style='" + _ + l + "'>",
            d += "<div class='dhx_tooltip_date'>" + (r[o]._timed ? e.templates.event_date(r[o].start_date) : "") + "</div>", d += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", d += e.templates[t.name + "_tooltip"](r[o].start_date, r[o].end_date, r[o]) + "</div>"
        }
        e._tooltip.style.display = "", e._tooltip.style.top = "0px", document.body.offsetWidth - i.left - e._tooltip.offsetWidth < 0 ? e._tooltip.style.left = i.left - e._tooltip.offsetWidth + "px" : e._tooltip.style.left = i.left + a.src.offsetWidth + "px", e._tooltip.date = n, e._tooltip.innerHTML = d,
          document.body.offsetHeight - i.top - e._tooltip.offsetHeight < 0 ? e._tooltip.style.top = i.top - e._tooltip.offsetHeight + a.src.offsetHeight + "px" : e._tooltip.style.top = i.top + "px"
      }
    }, e._matrix_tooltip_handler = function(t) {
      var a = e.matrix[e._mode];
      if (a && "cell" == a.render) {
        if (a) {
          var i = e._locate_cell_timeline(t),
            t = t || event;
          t.target || t.srcElement;
          if (i) return e._timeline_showToolTip(a, i, getOffset(i.src))
        }
        e._timeline_hideToolTip()
      }
    }, e._init_matrix_tooltip = function() {
      e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler),
        dhtmlxEvent(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler)
    }, e._set_timeline_dates = function(t) {
      e._min_date = e.date[t.name + "_start"](new Date(e._date)), e._max_date = e.date["add_" + t.name + "_private"](e._min_date, t.x_size * t.x_step), e.date[t.x_unit + "_start"] && (e._max_date = e.date[t.x_unit + "_start"](e._max_date)), e._table_view = !0
    }, e._renderMatrix = function(t, a) {
      a || (e._els.dhx_cal_data[0].scrollTop = 0), e._set_timeline_dates(this), e._timeline_set_full_view.call(this, t)
    }, e._timeline_html_index = function(t) {
      for (var a = t.parentNode.childNodes, i = -1, n = 0; n < a.length; n++)
        if (a[n] == t) {
          i = n;
          break
        }
      var r = i;
      if (e._ignores_detected)
        for (var s in e._ignores) e._ignores[s] && r >= 1 * s && r++;
      return r
    }, e._timeline_locate_hcell = function(t) {
      t = t || event;
      for (var a = t.target ? t.target : t.srcElement; a && "DIV" != a.tagName;) a = a.parentNode;
      if (a && "DIV" == a.tagName) {
        var i = e._getClassName(a).split(" ")[0];
        if ("dhx_scale_bar" == i) return {
          x: e._timeline_html_index(a),
          y: -1,
          src: a,
          scale: !0
        }
      }
    }, e._locate_cell_timeline = function(t) {
      t = t || event;
      for (var a = t.target ? t.target : t.srcElement, i = {}, n = e.matrix[e._mode], r = e.getActionData(t), s = e._ignores, d = 0, o = 0; o < n._trace_x.length - 1 && !(+r.date < n._trace_x[o + 1]); o++) s[o] || d++;
      i.x = 0 === d ? 0 : o, i.y = n.order[r.section];
      var _ = e._isRender("cell") ? 1 : 0;
      i.src = n._scales[r.section] ? n._scales[r.section].getElementsByTagName("td")[o + _] : null;
      for (var l = !1; 0 === i.x && "dhx_cal_data" != e._getClassName(a) && a.parentNode;) {
        if ("dhx_matrix_scell" == e._getClassName(a).split(" ")[0]) {
          l = !0;
          break
        }
        a = a.parentNode
      }
      return l ? (i.x = -1, i.src = a, i.scale = !0) : i.x = o, i
    };
    var t = e._click.dhx_cal_data;
    e._click.dhx_marked_timespan = e._click.dhx_cal_data = function(a) {
      var i = t.apply(this, arguments),
        n = e.matrix[e._mode];
      if (n) {
        var r = e._locate_cell_timeline(a);
        r && (r.scale ? e.callEvent("onYScaleClick", [r.y, n.y_unit[r.y], a || event]) : e.callEvent("onCellClick", [r.x, r.y, n._trace_x[r.x], (n._matrix[r.y] || {})[r.x] || [], a || event]))
      }
      return i
    }, e.dblclick_dhx_matrix_cell = function(t) {
      var a = e.matrix[e._mode];
      if (a) {
        var i = e._locate_cell_timeline(t);
        i && (i.scale ? e.callEvent("onYScaleDblClick", [i.y, a.y_unit[i.y], t || event]) : e.callEvent("onCellDblClick", [i.x, i.y, a._trace_x[i.x], (a._matrix[i.y] || {})[i.x] || [], t || event]))
      }
    };
    var a = e.dblclick_dhx_marked_timespan || function() {};
    e.dblclick_dhx_marked_timespan = function(t) {
      var i = e.matrix[e._mode];
      return i ? e.dblclick_dhx_matrix_cell(t) : a.apply(this, arguments)
    }, e.dblclick_dhx_matrix_scell = function(t) {
      return e.dblclick_dhx_matrix_cell(t)
    }, e._isRender = function(t) {
      return e.matrix[e._mode] && e.matrix[e._mode].render == t
    }, e.attachEvent("onCellDblClick", function(t, a, i, n, r) {
      if (!this.config.readonly && ("dblclick" != r.type || this.config.dblclick_create)) {
        var s = e.matrix[e._mode],
          d = {};
        d.start_date = s._trace_x[t], d.end_date = s._trace_x[t + 1] ? s._trace_x[t + 1] : e.date.add(s._trace_x[t], s.x_step, s.x_unit),
          s._start_correction && (d.start_date = new Date(1 * d.start_date + s._start_correction)), s._end_correction && (d.end_date = new Date(d.end_date - s._end_correction)), d[s.y_property] = s.y_unit[a].key, e.addEventNow(d, null, r)
      }
    }), e.attachEvent("onBeforeDrag", function(t, a, i) {
      return !e._isRender("cell")
    }), e.attachEvent("onEventChanged", function(e, t) {
      t._timed = this.isOneDayEvent(t)
    }), e.attachEvent("onBeforeEventChanged", function(e, t, a, i) {
      return e && (e._move_delta = void 0), i && (i._move_delta = void 0), !0
    }), e._is_column_visible = function(t) {
      var a = e.matrix[e._mode],
        i = e._get_date_index(a, t);
      return !e._ignores[i]
    };
    var i = e._render_marked_timespan;
    e._render_marked_timespan = function(t, a, n, r, s) {
      if (!e.config.display_marked_timespans) return [];
      if (e.matrix && e.matrix[e._mode]) {
        if (e._isRender("cell")) return;
        var d = e._lame_copy({}, e.matrix[e._mode]);
        d.round_position = !1;
        var o = [],
          _ = [],
          l = [],
          c = t.sections ? t.sections.units || t.sections.timeline : null;
        if (n) l = [a], _ = [n];
        else {
          var h = d.order;
          if (c) h.hasOwnProperty(c) && (_.push(c), l.push(d._scales[c]));
          else if (d._scales)
            for (var u in h) h.hasOwnProperty(u) && (_.push(u),
              l.push(d._scales[u]))
        }
        var r = r ? new Date(r) : e._min_date,
          s = s ? new Date(s) : e._max_date;
        if (r.valueOf() < e._min_date.valueOf() && (r = new Date(e._min_date)), s.valueOf() > e._max_date.valueOf() && (s = new Date(e._max_date)), !d._trace_x) return;
        for (var v = 0; v < d._trace_x.length && !e._is_column_visible(d._trace_x[v]); v++);
        if (v == d._trace_x.length) return;
        var f = [];
        if (t.days > 6) {
          var g = new Date(t.days);
          e.date.date_part(new Date(r)) <= +g && +s >= +g && f.push(g)
        } else f.push.apply(f, e._get_dates_by_index(t.days));
        for (var p = t.zones, m = e._get_css_classes_by_config(t), y = 0; y < _.length; y++) {
          a = l[y], n = _[y];
          for (var v = 0; v < f.length; v++)
            for (var x = f[v], b = 0; b < p.length; b += 2) {
              var w = p[b],
                k = p[b + 1],
                E = new Date(+x + 60 * w * 1e3),
                D = new Date(+x + 60 * k * 1e3);
              if (E = new Date(E.valueOf() + 1e3 * (E.getTimezoneOffset() - x.getTimezoneOffset()) * 60), D = new Date(D.valueOf() + 1e3 * (D.getTimezoneOffset() - x.getTimezoneOffset()) * 60), D > r && s > E) {
                var N = e._get_block_by_config(t);
                N.className = m;
                var S = e._timeline_getX({
                    start_date: E
                  }, !1, d) - 1,
                  C = e._timeline_getX({
                    start_date: D
                  }, !1, d) - 1,
                  M = Math.max(1, C - S - 1),
                  A = d._section_height[n] - 1 || d.dy - 1;
                N.style.cssText = "height: " + A + "px; left: " + S + "px; width: " + M + "px; top: 0;",
                  a.insertBefore(N, a.firstChild), o.push(N)
              }
            }
        }
        return o
      }
      return i.apply(e, [t, a, n])
    };
    var n = e._append_mark_now;
    e._append_mark_now = function(t, a) {
      if (e.matrix && e.matrix[e._mode]) {
        var i = e._currentDate(),
          r = e._get_zone_minutes(i),
          s = {
            days: +e.date.date_part(i),
            zones: [r, r + 1],
            css: "dhx_matrix_now_time",
            type: "dhx_now_time"
          };
        return e._render_marked_timespan(s)
      }
      return n.apply(e, [t, a])
    };
    var r = e._mark_timespans;
    e._mark_timespans = function() {
      if (e.matrix && e.matrix[e.getState().mode]) {
        for (var t = [], a = e.matrix[e.getState().mode], i = a.y_unit, n = 0; n < i.length; n++) {
          var s = i[n].key,
            d = a._scales[s],
            o = e._on_scale_add_marker(d, s);
          t.push.apply(t, o)
        }
        return t
      }
      return r.apply(this, arguments)
    };
    var s = e._on_scale_add_marker;
    e._on_scale_add_marker = function(t, a) {
      if (e.matrix && e.matrix[e._mode]) {
        var i = [],
          n = e._marked_timespans;
        if (n && e.matrix && e.matrix[e._mode])
          for (var r = e._mode, d = e._min_date, o = e._max_date, _ = n.global, l = e.date.date_part(new Date(d)); o > l; l = e.date.add(l, 1, "day")) {
            var c = +l,
              h = l.getDay(),
              u = [],
              v = _[c] || _[h];
            if (u.push.apply(u, e._get_configs_to_render(v)), n[r] && n[r][a]) {
              var f = [],
                g = e._get_types_to_render(n[r][a][h], n[r][a][c]);
              f.push.apply(f, e._get_configs_to_render(g)), f.length && (u = f)
            }
            for (var p = 0; p < u.length; p++) {
              var m = u[p],
                y = m.days;
              7 > y ? (y = c, i.push.apply(i, e._render_marked_timespan(m, t, a, l, e.date.add(l, 1, "day"))), y = h) : i.push.apply(i, e._render_marked_timespan(m, t, a, l, e.date.add(l, 1, "day")))
            }
          }
        return i
      }
      return s.apply(this, arguments)
    }, e._resolve_timeline_section = function(e, t) {
      var a = 0,
        i = 0;
      for (a; a < this._colsS.heights.length && (i += this._colsS.heights[a], !(i > t.y)); a++);
      e.y_unit[a] || (a = e.y_unit.length - 1),
        this._drag_event && !this._drag_event._orig_section && (this._drag_event._orig_section = e.y_unit[a].key), t.fields = {}, a >= 0 && e.y_unit[a] && (t.section = t.fields[e.y_property] = e.y_unit[a].key)
    }, e._update_timeline_section = function(e) {
      var t = e.view,
        a = e.event,
        i = e.pos;
      if (a) {
        if (a[t.y_property] != i.section) {
          var n = this._get_timeline_event_height(a, t);
          a._sorder = this._get_dnd_order(a._sorder, n, t._section_height[i.section])
        }
        a[t.y_property] = i.section
      }
    }, e._get_date_index = function(e, t) {
      for (var a = 0, i = e._trace_x; a < i.length - 1 && +t >= +i[a + 1];) a++;
      return a
    }, e._timeline_drag_date = function(t, a) {
      var i, n, r = t,
        s = {
          x: a
        },
        d = 0,
        o = 0;
      for (o; o <= this._cols.length - 1; o++)
        if (n = this._cols[o], d += n, d > s.x) {
          i = (s.x - (d - n)) / n, i = 0 > i ? 0 : i;
          break
        }
      if (r.round_position) {
        var _ = 1,
          l = e.getState().drag_mode;
        l && "move" != l && "create" != l && (_ = .5), i >= _ && o++, i = 0
      }
      if (0 === o && this._ignores[0])
        for (o = 1, i = 0; this._ignores[o];) o++;
      else if (o == this._cols.length && this._ignores[o - 1]) {
        for (o = this._cols.length - 1, i = 0; this._ignores[o];) o--;
        o++
      }
      var c;
      if (o >= r._trace_x.length) c = e.date.add(r._trace_x[r._trace_x.length - 1], r.x_step, r.x_unit),
        r._end_correction && (c = new Date(c - r._end_correction));
      else {
        var h = i * n * r._step + r._start_correction;
        c = new Date(+r._trace_x[o] + h)
      }
      return c
    }, e.attachEvent("onBeforeTodayDisplayed", function() {
      for (var t in e.matrix) {
        var a = e.matrix[t];
        a.x_start = a._original_x_start
      }
      return !0
    }), e.attachEvent("onOptionsLoad", function() {
      for (var t in e.matrix) {
        var a = e.matrix[t];
        a.order = {}, e.callEvent("onOptionsLoadStart", []);
        for (var t = 0; t < a.y_unit.length; t++) a.order[a.y_unit[t].key] = t;
        e.callEvent("onOptionsLoadFinal", []), e._date && a.name == e._mode && e.setCurrentView(e._date, e._mode);
      }
    }), e.attachEvent("onSchedulerResize", function() {
      if (e.matrix[this._mode]) {
        var t = e.matrix[this._mode];
        return e._renderMatrix.call(t, !0, !0), !1
      }
      return !0
    }), e.attachEvent("onBeforeDrag", function(t, a, i) {
      if ("resize" == a) {
        var n = i.target || i.srcElement,
          r = e._getClassName(n);
        r.indexOf("dhx_event_resize_end") < 0 ? e._drag_from_start = !0 : e._drag_from_start = !1
      }
      return !0
    })
  }, e._temp_matrix_scope()
});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_timeline.js.map
