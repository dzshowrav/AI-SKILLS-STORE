(source_file
  (root_action
    state: (state
      open: (state_open)
      value: (state_not_started)
      close: (state_close))
    name: (name
      (name_text_chunk)
      (name_text_chunk))
    metadata: (description
      icon: (description_marker)
      text: (description_content
        (description_text_chunk))
      close: (description_marker))
    metadata: (priority
      value: (priority_level))
    metadata: (story
      value: (story_name))
    metadata: (context
      item: (tag)
      item: (tag))
    metadata: (do_date
      datetime: (datetime)
      duration: (duration
        minutes: (minutes)))
    metadata: (created_date
      datetime: (datetime))
    metadata: (id
      icon: (id_hash)
      value: (uuid_value)))
  (root_action
    state: (state
      open: (state_open)
      value: (state_completed)
      close: (state_close))
    name: (name
      (name_text_chunk)
      (name_text_chunk))
    metadata: (created_date
      datetime: (datetime))
    metadata: (completed_date
      datetime: (datetime))
    metadata: (id
      icon: (id_hash)
      value: (uuid_value))
    child: (depth1_action
      marker: (depth1_marker)
      state: (state
        open: (state_open)
        value: (state_completed)
        close: (state_close))
      name: (name
        (name_text_chunk))
      metadata: (created_date
        datetime: (datetime))
      metadata: (completed_date
        datetime: (datetime))
      metadata: (id
        icon: (id_hash)
        value: (uuid_value))))
  (root_action
    state: (state
      open: (state_open)
      value: (state_completed)
      close: (state_close))
    name: (name
      (name_text_chunk)
      (name_text_chunk))
    metadata: (description
      icon: (description_marker)
      text: (description_content
        (description_text_chunk))
      close: (description_marker))
    metadata: (created_date
      datetime: (datetime))
    metadata: (completed_date
      datetime: (datetime))
    metadata: (id
      icon: (id_hash)
      value: (uuid_value))
    child: (depth1_action
      marker: (depth1_marker)
      state: (state
        open: (state_open)
        value: (state_not_started)
        close: (state_close))
      name: (name
        (name_text_chunk))
      metadata: (created_date
        datetime: (datetime))
      metadata: (id
        icon: (id_hash)
        value: (uuid_value))))
  (root_action
    state: (state
      open: (state_open)
      value: (state_not_started)
      close: (state_close))
    name: (name
      (name_text_chunk)
      (name_text_chunk))
    metadata: (description
      icon: (description_marker)
      text: (description_content
        (description_text_chunk))
      close: (description_marker))
    metadata: (created_date
      datetime: (datetime))
    metadata: (id
      icon: (id_hash)
      value: (uuid_value))
    child: (depth1_action
      marker: (depth1_marker)
      state: (state
        open: (state_open)
        value: (state_completed)
        close: (state_close))
      name: (name
        (name_text_chunk))
      metadata: (created_date
        datetime: (datetime))
      metadata: (completed_date
        datetime: (datetime))
      metadata: (id
        icon: (id_hash)
        value: (uuid_value))))
  (root_action
    state: (state
      open: (state_open)
      value: (state_not_started)
      close: (state_close))
    name: (name
      (name_text_chunk)
      (name_text_chunk))
    metadata: (description
      icon: (description_marker)
      text: (description_content
        (description_text_chunk))
      close: (description_marker))
    metadata: (id
      icon: (id_hash)
      value: (uuid_value))))