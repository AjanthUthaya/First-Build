<?php

// ==================== START ==================== //
// # Function to prevent cross-site scripting(XSS) #
// ==================== START ==================== //

function E_XSS($String) {
  echo htmlentities($String);
}

// ==================== END ==================== //
// # Function to prevent cross-site scripting(XSS) #
// ==================== END ==================== //
