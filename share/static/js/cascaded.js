function filter_cascade_by_id (id, vals, is_hierarchical) {
    var select = document.getElementById(id);
    var complete_select = document.getElementById(id + "-Complete" );
    return filter_cascade(select, complete_select, vals, is_hierarchical);
}

function filter_cascade (select, complete_select, vals, is_hierarchical) {
    if ( !( vals instanceof Array ) ) {
        vals = [vals];
    }

    if (!select) { return };
    var i;
    var children = select.childNodes;

    if ( complete_select ) {
        while (select.hasChildNodes()){
            select.removeChild(select.firstChild);
        }

        var complete_children = complete_select.childNodes;

        var cloned_labels = {};
        var cloned_empty_label;
        for ( var j = 0; j < vals.length; j++ ) {
            var val = vals[j];
            if ( val == '' && is_hierarchical ) {
                // no category, and the category is from a hierchical cf;
                // leave this set of options empty
            } else if ( val == '' ) {
                // no category, let's clone all node
                for (i = 0; i < complete_children.length; i++) {
                    if ( complete_children[i].cloneNode ) {
                        var new_option = complete_children[i].cloneNode(true);
                        select.appendChild(new_option);
                    }
                }
                break;
            }
            else {
                var labels_to_clone = {};
                for (i = 0; i < complete_children.length; i++) {
                    if (!complete_children[i].label ||
                          (complete_children[i].hasAttribute &&
                                !complete_children[i].hasAttribute('label') ) ) {
                        if ( cloned_empty_label ) {
                            continue;
                        }
                    }
                    else if ( complete_children[i].label == val ) {
                        if ( cloned_labels[complete_children[i].label] ) {
                            continue;
                        }
                        labels_to_clone[complete_children[i].label] = true;
                    }
                    else {
                        continue;
                    }

                    if ( complete_children[i].cloneNode ) {
                        var new_option = complete_children[i].cloneNode(true);
                        select.appendChild(new_option);
                    }
                }

                if ( !cloned_empty_label )
                    cloned_empty_label = true;

                for ( label in labels_to_clone ) {
                    if ( !cloned_labels[label] )
                        cloned_labels[label] = true;
                }
            }
        }
    }
    else {
// for back compatibility
        for (i = 0; i < children.length; i++) {
            if (!children[i].label) { continue };
            if ( val == '' && is_hierarchical ) {
                hide(children[i]);
                continue;
            }
            if ( val == '' || children[i].label.substr(0, val.length) == val) {
                show(children[i]);
                continue;
            }
            hide(children[i]);
        }
    }
}
